const data = ['1', 1, {
    a: 1,
    b: 2
}, [2, 3, 4]]

// const data = {
//     a: 1 
// }

const data1 = getCopyData(data)
data1[1] = 2
console.log(data1)

function getCopyData(source) {
    let data = null
    // 数组
    // 对象
    // 普通
    if (Array.isArray(source)) {
        if (!data) data = []
        for (let index = 0; index < source.length; index++) {
            const element = source[index];
            data[index] = getCopyData(element)
        }
    } else if (typeof source === 'object') {
        if (!data) data = {}
        for (const iterator in source) {
            data[iterator] = source[iterator]
        }
    } else {
        data = source
    }
    return data;
}
