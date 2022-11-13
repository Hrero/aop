process.on('message', data => {
    setTimeout(function(data) {
        // console.log(data.process, '==');
        process.send({status: 'success', type: 'from3'})
    }, 3000)
    // doSomeThing({process})
    if (data.process) {
        console.log(data.pool);
        for (const iterator in data.pool) {
            console.log(data.pool[iterator]);
            if (data.pool[iterator] === data.process) {
                console.log(22);
            } else {
                console.log(33);
            }
        }
        // for (let index = 0; index < data.pool.length; index++) {
        //     const element = data.pool[index];
        //     console.log(element, data.process, 'data');
        //     if (element === data.process) {
        //         console.log(22);
        //     } else {
        //         console.log(33);
        //     }
        // }
        // for (const iterator of data.pool.keys()) {
        //     console.log(iterator, '!!!');
        //     if (iterator == data.process) {
        //         console.log(21);
        //     }
        // }
    }
    // process.exit()
    // process.send('success')
})

function doSomeThing(data) {
    // console.log(data.process, '==');
    data.process.send({status: 'success', type: 'from'})
}
