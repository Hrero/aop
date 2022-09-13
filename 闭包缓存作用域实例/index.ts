import "reflect-metadata";
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;
const cacheFn = cacheSomeAttribute(port, hostname)
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain;charset=UTF-8');
    res.end(
        cacheFn('闭包返回')
    );
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

function cacheSomeAttribute(port, hostname) {
    let a = 1 // 这里的a是不会被释放的
    return function (nature) {
        a++
        console.log(a);
        return `${hostname}:${port}/${nature}`
    }
}
