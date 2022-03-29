function logClass(target: any) {
    target.prototype.apiUrl = 'http://www.baidu.com'
    target.prototype.hello = () => {
        console.log("hello world")
    }
console.log(target);
}

@logClass
class HttpClient {
    constructor() {}
}

const http: any = new HttpClient()
console.log(http.apiUrl);
http.hello()


