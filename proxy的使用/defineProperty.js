var desc = { configurable: true, enumerable: true, value: 10 };

var defineProperty = new Proxy(desc, {
    defineProperty: (target, prop, descriptor) => {
        console.log('called: ' + prop);
        console.log('descriptor:' + descriptor);
        Reflect.defineProperty(target, prop, descriptor);
    }
});

defineProperty.name = "908"
console.log("obj", defineProperty); // { configurable: true, enumerable: true, value: 10, name: '908' }
