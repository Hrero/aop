const print = require('./print')

// example.js
function Quantity(num) {
    if (num) {
        return new Array(num * 1024 * 1024);
    }
    return num;
}

function Fruit(name, quantity) {
    this.name = name
    this.quantity = new Quantity(quantity)
}

let apple = new Fruit('apple');
print();
let banana = new Fruit('banana', 20);
print();
// banana = null;
// global.gc();
// print();

// node --expose-gc example.js

