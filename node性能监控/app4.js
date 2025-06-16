const heapdump = require('heapdump');
heapdump.writeSnapshot('./' + Date.now() + '.heapsnapshot');

const format = function (bytes) {
    return (bytes / 1024 / 1024).toFixed(2) + ' MB';
};

const print = function() {
    const memoryUsage = process.memoryUsage();
    console.log(`heapTotal: ${format(memoryUsage.heapTotal)}, heapUsed: ${format(memoryUsage.heapUsed)}`);
}

function sum(n) {
    if (n == 1) return 1
    new Array(10).join('*')
    // 30kb
    print();
    return sum(n - 1) + n
}
sum(20)
gc();
heapdump.writeSnapshot('./' + Date.now() + '.heapsnapshot');
// node --expose-gc app4.js



