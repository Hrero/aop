// 管道通信
// 1 看不到输出，因为未和主进程建立通信
// const { spawn } = require('child_process');
// const child = spawn('pwd');
// 2 共用stdio（标准输入输出）
// const { spawn } = require('child_process');
// const child = spawn('pwd');
// // child.stdout.pipe(process.stdout);
// child.stdout.on('data', function(data) {
//     process.stdout.write(data);
// });

// const { spawn } = require('child_process');
// const child = spawn('pwd', {
//   stdio: 'inherit' // 继承 = process.stdin, process.stdout, process.stderr 或者 [0,1,2]
// });

// const { spawn } = require('child_process');
// const child = spawn('pwd', {
//   stdio: [process.stdin, process.stdout, process.stderr]
// });

// const { spawn } = require('child_process');
// const child = spawn('pwd', {
//   stdio: 'pipe' // 默认通过管道来获取子进程输出
// });
// child.stdout.on('data', (data) => {
//   console.log(data.toString());
// })

// https://www.jianshu.com/p/77a4b22d68a5

// 当 'exit' 事件被触发时，子进程的 stdio 流可能依然是打开的。
// // null, undefined，对于前三个元素，他们会设置为pipe,剩下的元素会设置为ignore
// const { spawn } = require('child_process');
// const child = spawn('pwd', {
//   stdio: ['pipe', null, null, null, 'pipe'] // fd3（文件描述符）以上 默认值为ignore， 3 4自定义管道 , // 子进程可通过createWriteStream制定fd3|4
// });
// // child.stdio[3] | child.stdio[4] 来获取
// child.stdout.on('data', (data) => {
//   console.log(data.toString());
// })

// 4 报错参数的话，应该采用数组
// const { spawn } = require('child_process');
// const child = spawn('ls -l');
// child.stdout.pipe(process.stdout);

// const { spawn } = require('child_process');
// const child = spawn('ls', ['-l']);
// child.stdout.pipe(process.stdout);

// 5
// const { spawn } = require('child_process');
// const fs = require('fs');
// const subprocess = spawn('ls', {
//   stdio: [
//     0, // 使用父进程的 stdin 用于子进程
//     fs.openSync('err.out', 'w'), // 把子进程的 stdout 通过管道传到父进程
//     fs.openSync('err.out', 'w') // 把子进程的 stderr 绑定文件描述符
//   ]
// });
// 6 
// const { spawn } = require('child_process');
// const fs = require('fs');
// const fd = fs.openSync("./node.log", "w+");
// const writableStream = fs.createWriteStream(null, {
//     flags: "w",
//     fd,
// });
// const subprocess = spawn('ls', {
//   stdio: [
//     0, // 使用父进程的 stdin 用于子进程
//     writableStream, // 把子进程的 stdout 通过管道传到父进程
//     fs.openSync('err.out', 'w') // 把子进程的 stderr 绑定文件描述符
//   ]
// });
// 7

const child_process = require("child_process");

const node = child_process.spawn("node",['./child.js'], {
  shell:false,
  stdio: ['inherit', 'inherit', 'inherit', 'ipc']
});

node.send({from: 'parent'});

