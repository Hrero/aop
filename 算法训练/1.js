var array = [1, 2, 3, 4]
array.forEach(element => {
    bb(element)
    console.log(6);
});

console.log(211);

async function bb(num) {
    await cc(num)
    console.log(5);
}

function cc(num) {
    return new Promise(r => {
        setTimeout(data => {
            r(true)
            console.log(num);
        }, 1000)
    })
}