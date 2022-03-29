import { validate, required } from './require'

class Greeter {
    greeting: string;

    constructor(message: string) {
        this.greeting = message;
    }

    @validate
    get(@required name: string) {
        console.log("Hello " + name + ", " + this.greeting);
        return "Hello " + name + ", " + this.greeting;
    }
}

const greet = new Greeter('message')
greet.get('name')

