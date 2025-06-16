// 线程的异步执行
function tick() {
  process.nextTick(() => console.log("tick"));
}

console.log("start");

setTimeout(() => {
  console.log("setTimeout");
});

tick();

console.log("end");
