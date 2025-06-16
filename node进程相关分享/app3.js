// 僵尸进程
const fork = require("child_process").fork

zombie();

function zombie() {
    const worker = fork("./worker2.js");
    console.log(`Worker is created, pid: ${worker.pid}, ppid: ${process.pid}`)
    while (1) { } // 主进程永久阻塞
}
// ps -o pid,ppid,state,tty,command | grep 'node'
// Z
