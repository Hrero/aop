const fork = require("child_process").fork

zombie();

function zombie() {
    const worker = fork("./worker2.js");
    worker
        .on('exit', () => {
            console.log('exit');
        })
        .on('close', () => {
            console.log('close');
        });
}
// 孤儿进程是可以被init进程收养，init会wait循环回收资源所以无害。
// 僵尸进程是会造成cpu的损耗，有害。

