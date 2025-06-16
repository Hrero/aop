const heapdump = require('heapdump');
heapdump.writeSnapshot('./' + Date.now() + '.heapsnapshot');

function sum(n) {
    if (n == 1) return 1
    new Array(1000000).join('*')
    return sum(n - 1) + n
}
sum(20)
gc();
heapdump.writeSnapshot('./' + Date.now() + '.heapsnapshot');
// node --expose-gc app3.js



