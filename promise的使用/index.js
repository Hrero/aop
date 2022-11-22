const b = 0;

// 可以加一个errType 来区分全局捕获的异常要怎么处理
const a = function() {
    return new Promise((r, j) => {
        if (b) {
            r(1)
        } else {
            j(2)
        }
    })
}
try {
const aa = await a()
console.log(aa);
} catch(err) {
console.log(err, '==');
}
// a().then(res => {
//     console.log(res);
// }).catch(err => {
//     console.log(err, 'err');
// })
