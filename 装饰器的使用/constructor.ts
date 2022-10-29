function logClass(target: any) {
    return class extends target {
        apiUrl: string = '修改后的apiUrl'
        getData() {
            console.log('修改:', this.apiUrl);
        }
    }
}

@logClass
class HttpClient {
    public apiUrl: string | undefined
    constructor() {
        this.apiUrl = '没修改前的apiUrl'
    }

    getData() {
        console.log(this.apiUrl)
    }
}

const http = new HttpClient()
http.getData() //修改: 修改后的apiUrl
