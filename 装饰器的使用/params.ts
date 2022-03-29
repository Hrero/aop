function logParams(params: any) {
    return function (target: any, methodName: string, paramIndex: number) {
        console.log(target)     // httpClient实例
        console.log(methodName) // getApi
        console.log(paramIndex) // 0
    }
}

class HttpClient {
    constructor() {}
    getApi(@logParams('id') id: number) {
        console.log(id)
    }
}

const http = new HttpClient()
http.getApi(123456)
