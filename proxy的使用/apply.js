// apply方法拦截函数的调用、
// call和apply和Reflect操作可以传上下文。
function sum(left, right) {
  return left + right;
}

var proxy = new Proxy(sum, {
    apply(target, ctx, args) {
        console.log(ctx, 'ctx');
      return Reflect.apply(...arguments) * 2;
    },
});

console.log(proxy(1, 2)); // 6
console.log(proxy.call(null, 5, 6)); // 22 ctx = 'this'
console.log(proxy.apply(this, [7, 8])); // 30

console.log('Reflect.apply(proxy, null, [9, 10]): ', Reflect.apply(proxy, null, [9, 10])); // 38
