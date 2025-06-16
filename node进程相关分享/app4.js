// 守护进程是一个在后台运行并且不受任何终端控制的进程，并且能够因为某个异常导致进程退出的时候重启子进程 
// 守护进程一般在系统启动时开始运行，除非强行终止，否则直到系统关机都保持运行
// ps axj a: 显示所有 x: 显示没有终端控制的进程 j: 显示相关信息
// master.js
const { fork } = require("child_process");

const forkChild = () => {
    const child = fork('log.js')
    child.on('exit', () => {
        setTimeout(() => {
            forkChild();
        }, 1000);
    });
}

forkChild();
process.title = 'node-守护进程'

