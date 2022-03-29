// 先进行一些装饰器的定义
function logClass1(target: any) {
    console.log('logClass1');
}
function logClass2(target: any) {
    console.log('logClass2');
}
function logAttribute1(param?: any) {
    return function (target: any, attrName: string) {
        console.log('attribute1');
    };
}
function logAttribute2(param?: any) {
    return function (target: any, attrName: string) {
        console.log('attribute2');
    };
}
function logMethod1(param?: any) {
    return function (
        target: any,
        methodName: string,
        descriptor: PropertyDescriptor,
    ) {
        console.log('logMethod1');
    };
}
function logMethod2(param?: any) {
    return function (
        target: any,
        methodName: string,
        descriptor: PropertyDescriptor,
    ) {
        console.log('logMethod2');
    };
}
function logParam1(param?: any) {
    return function (target: any, methodName: string, index: number) {
        console.log('logParam1');
    };
}
function logParam2(param?: any) {
    return function (target: any, methodName: string, index: number) {
        console.log('logParam2');
    };
}

@logClass1
@logClass2
class HttpClient {
    @logAttribute1()
    api1: string | undefined;

    @logAttribute2()
    api2: string | undefined;

    constructor() {}

    @logMethod1()
    get1() {}

    @logMethod2()
    get2() {
        console.log('==');
    }

    get3(@logParam1() param1: string, @logParam2() param2: string) {

    }
}

const http: any = new HttpClient()

setTimeout(() => {
    http.get3()
}, 3000)

setTimeout(() => {
    http.get2()
}, 4000)
