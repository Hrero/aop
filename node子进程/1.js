const child_precess = require('child_process')

class one{
    // a
    constructor(){
        this.a = 1
        // this.pool = new Set()
        this.pool = {}
    }
    do1() {
        this.a = this.a + this.a
        console.log(1, this.a);
        // console.log(1);
    }
    do2() {
        const work = child_precess.fork('./2.js')
        const work2 = child_precess.fork('./3.js')
        this.pool.work = work
        this.pool.work2 = work2
        // for (const iterator in this.pool) {
        //     console.log(this.pool[iterator]);
        //     if (this.pool[iterator] === work) {
        //         console.log(22);
        //     } else {
        //         console.log(33);
        //     }
        // }
        // this.pool.add(work2)
        // console.log(this.pool, '!!');
        // work.send('success')
        // work.on('message', data => {
        //     if (data.status === 'success') {
        //         console.log(data);
        //         // console.log(work, '====');
        //     }
        // })        
        // work2.send('success')
        // work2.on('message', data => {
        //     if (data.status === 'success') {
        //         console.log(data);
        //         // console.log(work, '====');
        //     }
        // })
        // this.do3(work, work2)
    }
    getProgress(name) {
        return this.pool[name]
    }
    do3(work, work2) {
        for (const iterator of this.pool.keys()) {
            console.log(iterator, '!!!');
            if (iterator == work) {
                console.log(21);
            }
            if (iterator == work2) {
                console.log(31);
            }
        }
    }
}

module.exports = new one();
// module.exports = one;
