const worker = require('./1')

function doSomeThing(data) {
    // console.log(data.process, '==');
    // data.process.send({status: 'success', type: 'from2'})
    const progress1 = worker.getProgress('work')

    for (const iterator in worker.pool) {
        if (worker.pool[iterator] === progress1) {
            setTimeout(item => {
                progress1.kill("SIGKILL");
                console.log(worker.getPools());
                // const progress1 = worker.getProgress('work')
                // console.log(progress1, 'progress1');
            }, 4000)
            
            console.log(221);
        } else {
            console.log(333);
        }
    }
}

module.exports = doSomeThing