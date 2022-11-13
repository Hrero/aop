const http = require('http');
const one = require('./1.js');
const one2 = require('./1.js');
// const one = new one1()
// const one2 = new one1()
one.do1()
one.do1()
one.do1()
one2.do1()
one2.do1()
one2.do1()
// 结论取的是单例的new


const server = http.createServer((req, res) => {
  res.end();
});
server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
server.listen(8000);
// console.log(1);
process.on('SIGTERM', close.bind(this, 'SIGTERM'));
process.on('SIGINT', close.bind(this, 'SIGINT'));
// process.on('SIGKILL', close.bind(this, 'SIGKILL'));

function close(signal) {
    console.log(`收到 ${signal} 信号开始处理`);

    server.close(() => {
        console.log(`服务停止 ${signal} 处理完毕`);
        process.exit(0);
    });
}

// process.on("SIGTERM", () => {
//     console.log(1);
//     process.exit(1)
// })
// process.on('exit', (code) => {
//     console.log(`即将退出，退出码：${code}`);
// });
// process.stdin.resume();

// process.on('SIGINT', () => {
//   console.log('Received SIGINT.  Press Control-D to exit.');
// });
// process.exit()
