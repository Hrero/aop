const { Log: { log, msg } } = require('@kd/dsl');
const Redis = require('../db/redisForSim.js')
const { findIndex } = require('lodash')

// 各个DB
const baseDB = require('../db/simInfo.js');


const metricsTool = require('../tool/metrics');
const { getSimData } = require('./listData.js');
const { getZyAppListDynamic, debounce, sleep, cookTestReq, forMatTime, isEmpty } = require('../tool/utils.js');

const { setDataList, checkV5Token, getZyV5TokenV5 } = require('../ZYAPI/index.js');
// 一天一次，提前跑出首页数据大盘所需的数据
const { addPieChartData } = require('./calcTotalStatus');
// 跑完基本信息之后，检测销卡状态
const checkWipeOut = require('./checkWipeOut');
const simInfoRedis = new Redis(cookTestReq().redisEnv)

let mongoEnv = null;
let simInfoDB = null;
let index = 0;
let appList = [];
let lastSimInfo = null;
let needRecord = false

let basetaskId;

/*
    走中移的接口更新一遍infoDB中的数据
 */
const getSimFromDb = async (params) => {
    const { _id, simOperatorId, limit, ecId } = params;
    const { appid, pwd, version } = appList[index];
    let simList = [];
    try {
        let filter = {
            simOperatorId,
            ecId,
            curStatus: { $ne: 'removed' },
            phoneStatus: { $ne: '04' }
        };
        if (_id) {
            filter['_id'] = _id;
        }
	    let startTime = Date.now();
        simList = await simInfoDB.findBy(filter, { fields: { prodinfos: 0, curProdInfo: 0 }, limit, sort: { _id: 1 } });
	    metricsTool.send('findSim', 'fenghuoTimer', metricsTool.STATUS.OK, null, (Date.now() - startTime));
        
    } catch(e) {
        // mongo有时会time out ，所以要一直重试
        return getSimFromDb(params);
    }
    
    // 暂停1200ms，并发100
    await sleep(1200);
    if ( version === 'v5' ) {
        checkV5Token({ appid, pwd, ecId });
    }
    
	if(simList && simList.length > 0){
        if(needRecord) {
           let lastSim = simList[simList.length - 1]
           log(msg('info', 'fenghuoTimeSever', 200000, `notice: Breakpoint insert ${lastSim._id} ${lastSim.ecId} start at ${Date.now()}`));
           await simInfoRedis.set('latest_sim_info',JSON.stringify({
               _id: lastSim._id,
               ecid: lastSim.ecId
           }))
           log(msg('info', 'fenghuoTimeSever', 200000, `notice: Breakpoint insert success ${lastSim._id} ${lastSim.ecId} end at ${Date.now()}`));
        }
		simList.forEach(item => {
            let copyItem = Object.assign({}, item);
			if (copyItem['_id']) {
				delete copyItem['_id'];
            }
			supplementBaseInfo(copyItem);
		})
	}
    
           
    
    if (simList.length >= limit) {
        let lastId = simList[simList.length - 1]['_id'];
        params['_id'] = { $gt: lastId };
        return getSimFromDb(params);
    } else {
        if(index == appList.length - 1) {
            await simInfoRedis.set('latest_sim_info','')
        }
        debounce(taskEndCallBack, 60000);
        // await client.set(`${appList[index].remark} ${appList[index].version} end`, `${Date.now()}`);
        log(msg('info', 'fenghuoTimeSever', 200000, `notice: basetask ${basetaskId} ${simOperatorId} ${ecId} end at ${Date.now()}`));
        return true;
    }
};

const getCompleteApiList = (item) => {
    // 不含关键字段接口
    const apiFieldMap = {
        querysmsopenstatus: ['smsStatus', 'smsOpenStatus'],
        querygprsopenstatus: ['gprsOpenStatus'],
    }

    // 接口初始化（关键字段必要接口）
    const apiList = [
        'gprsrealsingle', // 在线信息实时查询
        'querycardprodinfo', // 物联卡资费套餐查询
        'balancerealsingle', // 用户余额信息实时查询
        'querycardlifecycle', // 物联卡生命周期查询
    ]

    // 不含关键字段接口进行判断，为空才进行调用
    Object.keys(apiFieldMap).forEach(api => {
        for(field of apiFieldMap[api]) {
            if (isEmpty(item[field])) {
                apiList.push(api)
                return
            }
        }
    })

    return apiList;
}

const supplementBaseInfo = async (item) => {
    let completeApiList = getCompleteApiList(item)
    let baseInfo = await getSimData(item, completeApiList, true);
    if (Object.keys(baseInfo).length) {
        delete baseInfo.errData;
        baseInfo.baseTaskUpdateTime = Date.now()
        simInfoDB.upsertBy({
            msisdn: item.msisdn
        }, { '$set': baseInfo }, () => {
            metricsTool.send('updateBaseInfo', 'fenghuoTimer', metricsTool.STATUS.OK);
	        log(msg('info', 'updateBaseInfoSuccess', 200100, `simOperatorId:  ${item.simOperatorId}, msisdn: ${item.msisdn}`));
        });
    }
    return true;
};

const taskEndCallBack = async () => {
    // 开始统计大盘饼图
    log(msg('info', 'fenghuoTimeSever', 200300, `startCalcPieData at ${Date.now()}`));
    addPieChartData(mongoEnv, appList[index].simOperatorId, appList[index].busiId, appList[index].ecid);
	if(index < (appList.length - 1)){
        let currentSimId = null
        let currentApp = appList[++index];
        let recordIndex = findIndex(appList, {priorityUpdate: ''})
        let { simOperatorId, ecid, appid, pwd, version } = currentApp
        /**
         * 更新到第一个需要记录的运营商时，needRecord修改为true，并检查是否有断点，如果没有，继续更新，如果有，切换到断点位置的app继续更新；
        */
        if(recordIndex == index) {
            needRecord = true
            try {
                lastSimInfo = await simInfoRedis.get('latest_sim_info')
                let lsmJson = JSON.parse(lastSimInfo)
                log(msg('info', 'fenghuoTimeSever', 200000, `notice: latest_sim_info -> ${lastSimInfo} start at ${Date.now()}`));
                if(!!lastSimInfo) {
                    if(findIndex(appList, {ecid: lsmJson.ecid})>-1) {
                        currentSimId = lsmJson._id
                        index = findIndex(appList, {ecid: lsmJson.ecid}) 
                        simOperatorId = appList[index].simOperatorId
                        ecid = appList[index].ecid
                        appid = appList[index].appid
                        pwd = appList[index].pwd
                        version = appList[index].version
                        log(msg('info', 'fenghuoTimeSever', 200000, `notice: Breakpoint starting point currentSimId->${currentSimId} start at ${Date.now()}`));
                    }
                }
            } catch(err){
                
            }
            
        }
        if (version === 'v5') {
            getZyV5TokenV5({ appid, pwd, ecId: ecid });
        }
        log(msg('info', 'fenghuoTimeSever', 200000, `notice: basetask ${basetaskId} ${simOperatorId} ${ecid} start at ${Date.now()}`));
        let param = { simOperatorId, ecId: ecid, limit: 20 }
        if(currentSimId) {
            param['_id'] = {
                $gt: simInfoDB.DB.getId(currentSimId)
            }
        }
        getSimFromDb(param);
	}else {
        log(msg('info', 'fenghuoTimeSever', 200000, `notice: basetask ${basetaskId} end at ${Date.now()}`));
        checkWipeOut(mongoEnv);
		log(msg('info', 'fenghuoTimeSever', 200000, `notice: basetask end at ${Date.now()}`));
	}
};

const main = async () => {
    mongoEnv = cookTestReq().mongoEnv;
    simInfoDB = new baseDB(mongoEnv);
    index = 0;
    needRecord = false;
    appList = await getZyAppListDynamic(mongoEnv.req)
    /**
     * appList优先级排序，及时性较高的放在最前面
    */
    // appList.sort((a, b)=>{
    //     if(a.priorityUpdate === undefined) {
    //         a.priorityUpdate = ''
    //     }
    //     if(b.priorityUpdate === undefined) {
    //         b.priorityUpdate = ''
    //     }
    //     return Number(b.priorityUpdate) - Number(a.priorityUpdate)
    // })
    setDataList(appList);
    basetaskId=`${forMatTime(Date.now())}ID${Date.now()}`;
    log(msg('info', 'fenghuoTimeSever', 200000, `notice: basetask ${basetaskId} start at ${Date.now()}`));
	const { simOperatorId, ecid, appid, pwd, version } = appList[index];
    if (version === 'v5') {
        await checkV5Token({appid, pwd, ecId: ecid});
     }
    log(msg('info', 'fenghuoTimeSever', 200000, `notice: basetask ${basetaskId} ${simOperatorId} ${ecid} start at ${Date.now()}`));
	getSimFromDb({ simOperatorId, ecId: ecid, limit: 20 })
};
module.exports.run = main;