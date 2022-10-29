const proxy = new Proxy({
    _secret: 'easily scared',
    eyeCount: 'asd'
}, { // 访问者模式
    get: () => {
        console.log('get');
        return 10
    },
    set: (target, prop, value, receiver) => { 
        console.log('set');
        target[prop] = value;
        console.log('property set: ' + prop + ' = ' + value, receiver); // receiver : {count: 11}
        return true;
    },
    has: (target, key) => { // 对in方法做拦截处理
        console.log("key==", key)
        if (key.includes('_')) {
            return false;
        }
        return key in target;
    }
})
console.log('count' in proxy); // false
proxy.count = 1
++proxy.count
proxy.count = '2'; // property set: count = 2

console.log('count' in proxy); // true
console.log('_secret' in proxy); // false
console.log('eyeCount' in proxy); // true


