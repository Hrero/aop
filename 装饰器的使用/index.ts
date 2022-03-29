// https://juejin.cn/post/7019921363918045192
class TestController{

    private id;

    constructor() {
    }

    setId(id) {
        this.id = id
    }

    getId() {
        return this.id
    }
}

const testController = new TestController()
testController.setId(1)
console.log(testController.getId());
