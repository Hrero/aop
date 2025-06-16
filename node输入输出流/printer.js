const fs = require("fs")

fs.open("./logs.txt", "w", (err, fd) => {
    console.log(fd, 'fdfdfdfdgdgd');
    if (err) throw Error(err.message)
    process.stdin.on("data", data => {
        fs.write(fd, data.toString() + "\n", (err) => {
            if (err) throw Error(err.message)
        })
    })
})

// node logger.js | node printer.js
// 通过管道链接两个文件，输出对应输出
