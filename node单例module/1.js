const child_precess = require('child_process')

class one{
    // a
    constructor(){
        this.a = 1
    }
    do1() {
        this.a = this.a + this.a
        console.log(1, this.a);
        // console.log(1);
    }
    do2() {
        const work = child_precess.fork('./2.js')
        console.log(work, 'work====');
    }
}

module.exports = new one();
// module.exports = one;
