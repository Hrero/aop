// /app/lib/memory.js
const os = require("os");
// 获取当前Node内存堆栈情况
const { rss, heapUsed, heapTotal, external } = process.memoryUsage();
// 获取系统空闲内存
// const sysFree = os.freemem();
// 获取系统总内存
const sysTotal = os.totalmem();

// 单位字节
// rss：表示node进程占用的内存总量。
// heapTotal：表示堆内存的总量。
// heapUsed：实际堆内存的使用量。
// external：外部程序的内存使用量，包含Node核心的C++程序的内存使用量。

/**
 * 单位为字节格式为 MB 输出
 */
const format = function (bytes) {
    return (bytes / 1024 / 1024).toFixed(2) + ' MB';
};

module.exports = {
  memory: () => {
    return {
    //   sysFree: "空闲的系统内存量:" + format(sysFree), // 机器
    //   sysTotal: "系统内存总量:" + format(sysTotal), // 机器
    //   sys: "系统内存占用率" + ((1 - sysFree / sysTotal) * 100).toFixed(2) + "%", // 系统内存占用率
      heapUsed: "node实际堆内存的使用量:" + format(heapUsed), // node使用
      heapTotal: "node堆内存的总量:" + format(heapTotal), // node总量
      external: "V8 引擎内部的 C++ 对象占用的内存:" + format(external), 
      rss: "RAM 中保存的进程占用的内存部分:" + format(rss), 
      heap:
        "Node堆内存占用率:" + ((heapUsed / heapTotal) * 100).toFixed(2) + "%", // Node堆内存占用率
      node:
        "Node占用系统内存的比例:" + ((rss / sysTotal) * 100).toFixed(5) + "%", // Node占用系统内存的比例
    };
  },
};
