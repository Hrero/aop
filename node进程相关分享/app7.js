// 输入流输出流
process.stdin.setEncoding("utf8");

process.stdin.on("readable", () => {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    process.stdout.write(`data: ${chunk}`);
  }
});
