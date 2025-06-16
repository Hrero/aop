const fork = require("child_process").fork

const server = require("net").createServer()
server.listen(3000)
const worker = fork("./worker.js")
process.title = "node-master"
worker.send("server", server)
console.log(`worker created, ppid is ${process.pid}, pid is ${worker.pid}`)
// 孤儿进程
// 活动监视器退出master
// 运行curl http://127.0.0.1:3000
// ppid: 1
