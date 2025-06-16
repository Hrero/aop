// var numbers = [{a: 1}, {b: 1}, {c: 1}, {d: 1}];
// let a = {}
// try {
    
// a = numbers.reduce((obj, item) => {
//     Object.assign(obj, item)
//     try {
//         throw new Error('sss')
//     } catch (error) {
//         console.log(error, '===');
//     }
//     return obj
// })
// } catch (error) {
//     console.log(error, '===');
// }
// console.log(a, 1);

function a() {
    throw new Error('sss')
    console.log(1);
}

function b() {
    a()
    console.log(2);
}
try {
    b()
} catch (error) {
    console.log(error, 1);
}

