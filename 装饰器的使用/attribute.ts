/**
 * 属性装饰器
 * params 装饰器传入的参数
 * target 装饰器实例
 * attr 装饰器属性
 */
function logProperty(params: any) {
    return function(target: any, attr: string) {
        target[attr] = params
    }
}

class HttpClient {

    @logProperty('属性装饰器赋值')
    public apiUrl: string | undefined

    constructor() {
    }

    ​getData() {
        console.log(this.apiUrl)
    }
}

const http = new HttpClient()
http.getData()
