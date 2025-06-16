//阻塞线程
//curl 127.0.0.1:8080/computed
const http = require("http")
const computed = () => {
    let sum = 0;
    console.log("computed start!")
    console.time("time")
    // 计算0 累加到 10^10的结果
    for (let i = 0; i < 1e10; i++) {
        sum += i
    }
    console.log("computed end")
    console.timeEnd("time")
    return sum
}
http.createServer((req, res) => {
    if (req.url === "/computed") {
        const sum = computed()
        res.end(`Sum is ${sum}`)
    }
    // res.end("!!!")
}).listen(8080, "localhost", () => {
    console.log("server start")
})
//computed end
//time: 59.732s
//computed start!