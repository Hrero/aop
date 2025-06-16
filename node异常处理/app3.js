const http = require("http");
const cron = require("node-cron");

cron.schedule('00 45 * * * *', async () => {
  console.log('进来就看看执行了几遍');
});
// 结论取的是单例的new
const server = http.createServer((req, res) => {
  res.end();
});
server.listen(8000);
