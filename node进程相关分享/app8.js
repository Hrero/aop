//线程退出 1.主动退出 2.未捕获得异常 3.未处理的异步 4.信号
// 1.process.exit(code) code = 0正常退出 其他非正常退出catch

// 2.throw new Error code=1
// process.on("uncaughtException", (error) => {
//     console.log(1111)
//     console.error(error);
//     process.exit(1);
// });

// 3.reject中抛出异常默认都为0
// process.on("unhandledRejection", (error) => {
//     console.log(1111)
//     console.error(error);
//     process.exit(1);
// });

// 4.信号
// SIGTERM 15 进程主动自己退出
// SIGHUB 1 进程会话下各个进程退出
// SIGINT 2 ctrl+c 尝试中断
// SIGSTOP 19 暂停进程 对应SIGCONT-启动进程
// SIGQUIT 3 程序错误退出信号，会产生core文件-程序崩溃linux调试用的文件
// SIGKILL 9 不能够通过事件监听捕获 SIGSTOP 也不能捕获

// exit和close的区别
// 1
// 1
// 1
// 12
// setInterval(data => {
//   console.log(1);
// }, 1000)
// setTimeout(data => {
//  process.exit(0)
// }, 4000)
// process.on("exit", (code, signal) => {
//     console.log(12);
// });
// process.on("close", (code, signal) => {
//     console.log(13);
// });

// 2
// Going to kill
// exited null SIGTERM
// closed null SIGTERM
// const cp = require('child_process').spawn('sleep', ['100'])
// cp.on('exit', console.log.bind(console, 'exited'))
// cp.on('close', console.log.bind(console, 'closed'))
// setTimeout(function () {
//   console.log('Going to kill')
//   cp.kill()
// }, 500)

// 3
// const cp = require('child_process').spawn('yes')
// cp.on('exit', console.log.bind(console, 'exited'))
// cp.on('close', console.log.bind(console, 'closed'))

// // 输出管道未关闭close不会调用
// const cpNext = require('child_process').spawn('cat')
// cp.stdout.pipe(cpNext.stdin)

// setTimeout(function () {
//   console.log('Going to kill')
//   cp.kill()
// }, 500)

// 4
// const cp = require('child_process').spawn('yes')
// cp.on('exit', console.log.bind(console, 'exited'))
// cp.on('close', console.log.bind(console, 'closed'))

// const cpNext = require('child_process').spawn('cat')
// cp.stdout.pipe(cpNext.stdin)

// setTimeout(function () {
//   console.log('Going to kill')
//   cp.kill()

//   setTimeout(function () {
//     cp.stdout.destroy() // 关闭了 stdout 之后，才会触发 close 事件
//   }, 500)
// }, 500)

// 5 kill输入进程，也可以进入close，前提要先stdin.destroy
// const cp = require('child_process').spawn('yes')
// cp.on('exit', console.log.bind(console, 'exited'))
// cp.on('close', console.log.bind(console, 'closed'))

// const cpNext = require('child_process').spawn('cat')
// cp.stdout.pipe(cpNext.stdin)

// setTimeout(() => {
//   console.log('Going to kill')
//   cp.stdout.destroy()
//   cp.kill()
//   setTimeout(() => {
//     cpNext.stdin.destroy()
//     cpNext.kill()
//   }, 500)
// }, 500)

// 6 例子 
// const exec = require('child_process').exec;
// const child = exec('ls', (error, stdout, stderr) => {
//     if (error) {
//         console.log('stderr ', stderr);
//         return;
//     }
//     console.log('stdout \n', stdout);
// });

// child.on('close', (code) => {
//     console.log(`close: ${code}`);
// });

// child.on("exit", (code) => {
//     console.log('exit')
// })

// 结论：触发了exit事件并不意味着一定会触发close事件。所以在选择监听事件的时候，如果只是关心进程是否存在，只需要监听exit事件即可，
// 如果不关心进程是否存在，而是关心输入输出，则需要监听close事件