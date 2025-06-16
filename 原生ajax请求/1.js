/**
* @params url {string} 请求URL
* @params method {string} 请求方法，默认GET
* @params data {object} 请求数据
* @params header {object} 请求头信息
*/
function ajax(url,method='GET',data={},header={}){
	if(method === 'GET'){
		let params = getParams(data) // 处理URL参数
		data = null // get请求数据置为null
		url = url + '?' + params
	}else if(method === 'POST'){
		header = Object.assign({
			'Content-Type': 'application/json'
		},header)
	}

	return new Promise((resolve,reject) => {
		let xml = new XMLHttpRequest()
		xml.onreadystatechange = function(){
			if(xml.readyState === 4 && /^(2|3)\d{2}$/.test(xml.status)){
				resolve(data.responseText)
			}
			reject(xml)
		}
		xml.open(method,url,true)
		for(var key in header){
			xml.setRequesttHeader(key, header[key])
		}
		xml.send(data)
	})
}

// 拼接url参数
function getParams(data){
	let arr = []
	for(var key in data){
		arr.push([encodeURIComponent(key)] + '=' + encodeURIComponent(data[key]))
	}
	return arr.join('&')
}

// // 测试
// ajax('https://www.xxx.com/api','GET',{'name':'hello','age':20}).then(res => {
// 	console.log(res)
// },err => {
// 	console.log(err)
// })

ajax('http://10.88.151.15:20883/changeScheduleTaskState','POST',{"name":"simHistotryMonth", "state":4, "appId": "102846", "appKey": "07LZE2Z1G4Qa96it3oIRwDxOyFetKkBM"}).then(res => {
	console.log(res)
},err => {
	console.log(err)
})
