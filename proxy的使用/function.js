function proxy_construct_obj(disposition){
    this.disposition = disposition;
}
const proxyConstruct = new Proxy(proxy_construct_obj, { // 拦截new操作符，返回的是一个对象
    construct: (target, args) => {
        console.log('在这儿做处理');
        return new target(...args)
    }
})

console.log(new proxyConstruct('hzr').disposition);


