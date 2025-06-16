const heapdump = require('heapdump');

heapdump.writeSnapshot('./test1' + '.heapsnapshot');

// overflow.js v8大内存占用
const format = function (bytes) {
    return (bytes / 1024 / 1024).toFixed(2) + ' MB';
};

const print = function() {
    const memoryUsage = process.memoryUsage();
    console.log(`heapTotal: ${format(memoryUsage.heapTotal)}, heapUsed: ${format(memoryUsage.heapUsed)}`);
}

const total = [];

const array = 6
for (let index = 0; index < array; index++) {
    total.push(new Array(20 * 1024 * 1024)); // 大内存占用
    print();
}
// gc();
heapdump.writeSnapshot('./test2' + '.heapsnapshot');
// node --expose-gc app1.js
