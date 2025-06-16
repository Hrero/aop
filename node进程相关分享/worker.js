const http = require("http")
const server = http.createServer((req, res) => {
    console.log(`I am worker process, pid: ${process.pid}, ppid: ${process.ppid}`);
})

let worker = null;
process.title = "node-worker"
process.on("message", (message, sendHandle) => {
    if (message === "server") {
        worker = sendHandle
        // 当新的 TCP 流被建立时触发
        worker.on("connection", (socket) => {
            server.emit("connection", socket)
        })
    }
})
