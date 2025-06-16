// STOP和SIGCONT启动
const http = require('http');
const fs = require('fs');
// SIGCONT启动信号
// fg 1 前台运行
// bg 1 后台运行
setInterval(data => {
  fs.appendFile('./1.js', `1` + '\n', {} ,() => {
    console.log(11);
  })
}, 1000)

const server = http.createServer((req, res) => {
  res.end();
});
server.listen(8000);
