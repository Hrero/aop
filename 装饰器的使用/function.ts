/**
 * params 传入的装饰器的值
 * target 装饰器的实例
 * methodName 方法名称
 * descriptor 信息value和target是一回事
 */
function get(params: any) {
    console.log(params, '====');
    return function(target: any, methodName: string, descriptor: PropertyDescriptor) {
        console.log(target)
        console.log(methodName)
        console.log(descriptor)
        // 修改前保存原始传入的方法
        let originalMethod = descriptor.value

        // 重写传入的方法
        descriptor.value = function(...args: any[]) {
            // 执行原方法
            originalMethod.apply(this, args)
            args = args.map(val => +val)
            console.log(args);
        }
    }
}

class HttpClient {

    constructor() {
    }

    @get('http://www.baidu.com')
    getApi() {
        console.log(2);
    }
}

const http: any = new HttpClient()

http.getApi('123', '456', '789')  //打印[123, 456, 789]
