const http = require('http');
const schedule = require("node-schedule");
// let cron = require('cron')
// const cron = require('node-cron')
// var index = 0
// cron.schedule('*/3 * * * * *', function() {
//   // console.log(1);
// 	getTaskStart()
// });

var index = 0
schedule.scheduleJob('30 * * * * *', function() {
  // console.log(1);
	getTaskStart()
});
// schedule.scheduleJob("30 * * * * *", async () => {
//   throttled(getTaskStart(index), 1000)
// });
// process.title = 'node定时任务vscode测试'
function getTaskStart() {
  index = index + 1
  console.log('关闭vscode观察是不是执行了定时任务', index);
}

function throttled(fn, delay) {
  // let timer = null
  let starttime = Date.now()
  return function () {
      let curTime = Date.now() // 当前时间
      let remaining = delay - (curTime - starttime)  // 从上一次到现在，还剩下多少多余时间
      let context = this
      let args = arguments
      // clearTimeout(timer)
      if (remaining <= 0) {
          fn.apply(context, args)
          starttime = Date.now()
      } else {
        return
          // timer = setTimeout(fn, remaining);
      }
  }
}

// require('./1')
// 结论取的是单例的new
const server = http.createServer((req, res) => {
  res.end();
});
server.listen(8000);
