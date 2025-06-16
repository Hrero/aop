const http = require('http');
require('./1')
// 结论取的是单例的new
const server = http.createServer((req, res) => {
  res.end();
});
server.listen(8000);
