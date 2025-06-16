// const b = 0;

// const { getPackedSettings } = require("http2");

// 可以加一个errType 来区分全局捕获的异常要怎么处理
// const a = function() {
//     return new Promise((r, j) => {
//         if (b) {
//             r(1)
//         } else {
//             j(2)
//         }
//     })
// }
// try {
// const aa = await a()
// console.log(aa);
// } catch(err) {
// console.log(err, '==');
// }
// a().then(res => {
//     console.log(res);
// }).catch(err => {
//     console.log(err, 'err');
// })
getBuild().then(res => {
    console.log(res, '====');
})


async function getPackedSettings1() {
    return 1
}

async function getBuild() {
    return new Promise(async r => {
        const a = await getPackedSettings1()
        console.log(a);
        setTimeout(data => {
            r(1)
        }, 1000)
    })
}


function proxyFn() {
    setTimeout(data => {
        return 1
    }, 1000)
}
