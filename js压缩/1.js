const data =  require('./2')
const lz =  require('lz-string')
// const lz = require('./5.js')
const f = require('fs')
// console.log(data);
// const c = lz.compress(JSON.stringify(data))
const c = lz.compressToBase64(JSON.stringify(data))
f.writeFileSync('./压缩.js', c, () => {})
// console.log(c, '====');



// f.readFile('./6.js', 'utf8', (err, data) => {
//    const c = lz.decompressFromBase64(data)
// console.log(c);
// })