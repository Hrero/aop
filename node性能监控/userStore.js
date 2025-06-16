const print = require('./print')
// 一、共用一个map存储用户信息
// const memoryStore = new Map();

// exports.getUserToken = function (key) {
//     const token = memoryStore.get(key);

//     if (token && Date.now() - token.now > 2 * 60) {
//         return token;
//     }

//     const dbToken = db.get(key);
//     memoryStore.set(key, {
//         now: Date.now(),
//         val: dbToken,
//     });
//     return token;
// }

// 二、定时器 8里面是有回收问题，16里面没有了
// const a = () => {
//     const b = {
//         longStr: new Array(1000000).join('*')
//     }
//     print()
// }
// setInterval(a, 1000)

// 三、闭包 8 有问题 16没有
// function count() {
//     var arr = [];
//     for (var i=1; i<=3; i++) {
//         arr.push((function (n) {
//             return function () {
//                 var ba = new Array(1000000).join('*')
//                 return n * n;
//             }
//         })(i));
//     }
//     return arr;
// }

// var results = count();
// var f1 = results[0];
// var f2 = results[1];
// var f3 = results[2];

// f1(); // 1
// print()
// f2(); // 4
// print()
// f3(); // 9
// print()
// 四、递归 8 有问题 16没有
// function sum(n) {
//     if (n == 1) return 1
//     new Array(1000000).join('*')
//     print()
//     return sum(n - 1) + n
// }
// sum(20)
// 五、v8 跑起来程序会自动分配2G内存，如果超过2G就会崩掉 node overflow.js
// node --max-old-space-size=4096 overflow.js 







