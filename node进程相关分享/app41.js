// 脱离终端守护进程
const { spawn } = require('child_process');

spawn('node', ['./app4.js'], {
    detached: true,
});

process.exit(0);
