const http = require("http");
const middleWare = require("./3");

middleWare.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    console.log("捕获到异常", error?.stack);
  }
});
middleWare.use(async (ctx, next) => {
  console.log(1);
  await next();
});
middleWare.use(async (ctx, next) => {
  console.log(2);
  await next();
});
middleWare.use(async (ctx, next) => {
  console.log(3);

    setTimeout(data => {
      try {
        yihcnag()
    } catch (error) {
      console.log('1' + error.stack);
    }
    }, 2000)
    setInterval(data => {
      console.log(1);
    }, 1000)
  await next();
});
function yihcnag() {
  throw new Error("错误信息");
}
try {
  // middleWare.compose().then((fn) => {
  //   fn({});
  // });
  middleWare.compose()({})
} catch (error) {
  console.log(`系统报错,:${error?.stack}`);
}
// require('./1')
// 结论取的是单例的new
const server = http.createServer((req, res) => {
  res.end();
});
server.listen(8000);
