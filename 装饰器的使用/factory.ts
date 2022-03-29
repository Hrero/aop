function logClass(params: string) {
    return function (target: any) {
        target.prototype.hello = () => {
            console.log(params)
        }
    }
}

@logClass('hello world')
class HttpClient{
    constructor() {}
}

const http: any = new HttpClient()
http.hello()
