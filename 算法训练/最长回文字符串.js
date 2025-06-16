var s = "cbeebcabad"
var c = []
var b = null
for (let index = 0; index < s.length; index++) {
    let element = s[index];
    b = element
    let cb = b
    for (let i = index + 1; i < s.length; i++) {
        ce = s[i];
        cb = cb + ce
        if (isHz(cb)) {
            c.push(cb)
        }
    }
}
let d = ''
let i = null
for (let index = 0; index < c.length; index++) {
    const element = c[index];
    if (element.length > d.length) {
        d = element
        i = index
    }
}

console.log(d, i);

function isHz(str) {
    var b = [...str.split('').reverse()]
    var c = str.split('')
    var d = true
    for (let index = 0; index < b.length; index++) {
        const element = b[index];
        const e = c[index];
        if (element != e) {
            d = false
        }
    }
    return d
}
console.log(isHz('aba'));

