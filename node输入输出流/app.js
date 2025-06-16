const http = require('http');
// require('./1')
// require('./2')
// require('./3')
// 结论取的是单例的new
console.log(process.stdin.fd, 'process.stdout');
const server = http.createServer((req, res) => {
  res.end();
});
server.listen(8000);
