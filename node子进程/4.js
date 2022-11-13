const worker = require('./1')

function doSomeThing(data) {
    // console.log(data.process, '==');
    // data.process.send({status: 'success', type: 'from2'})
    const progress = worker.getProgress('work')

    for (const iterator in worker.pool) {
        if (worker.pool[iterator] === progress) {
            console.log(22);
        } else {
            console.log(33);
        }
    }
}

module.exports = doSomeThing