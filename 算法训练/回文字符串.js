var a = [1, 2, 3, 3, 2, 3]
var c = [...a].reverse()
var b = true;
for (let index = 0; index < c.length; index++) {
    const cl = c[index];
    const al = a[index];
    if (cl != al) {
        b = false
    }
}
console.log(b);
