var lists = [[1,4,5],[1,3,4],[2,6]]
var b = []

for (let index = 0; index < lists.length; index++) {
    const element = lists[index];
    if (Array.isArray(element)) {
        for (let index = 0; index < element.length; index++) {
            const e = element[index];
            b.push(e)
        }
    }
}

console.log(b.sort((a,b) => a-b));
