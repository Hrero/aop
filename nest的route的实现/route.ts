import "reflect-metadata";
import { isFunction } from "util";

const METHOD_METADATA = 'method';
const PATH_METADATA = 'path';

const Controller = (path: string): ClassDecorator => {
    return target => {
        Reflect.defineMetadata(PATH_METADATA, path, target)
    }
}

const createMappingDecorator = (method: string) => (path: string): MethodDecorator => {
    return (target, key, descriptor) => {
        Reflect.defineMetadata(PATH_METADATA, path, descriptor.value);
        Reflect.defineMetadata(METHOD_METADATA, method, descriptor.value);
    }
}

const Get = createMappingDecorator('GET');
const Post = createMappingDecorator('POST');

function mapRoute(instance: Object) {
    const prototype = Object.getPrototypeOf(instance);

    // 筛选出类的 methodName
    const methodsNames = Object.getOwnPropertyNames(prototype)
                                .filter(item => item !== 'constructor' && isFunction(prototype[item]))
    return methodsNames.map(methodsName => {
        const fn = prototype[methodsName];

        // 取出定义的 metadata
        const route = Reflect.getMetadata(PATH_METADATA, fn);
        const method = Reflect.getMetadata(METHOD_METADATA, fn);
        return {
            route,
            method,
            fn,
            methodsName
        }
    })
}

@Controller('/test')
export class SomeClass {

  @Get('/a')
  someGetMethod() {
    return 'hello world';
  }

  @Post('/b')
  somePostMethod() {}

}

console.log(Reflect.getMetadata(PATH_METADATA, SomeClass)); // '/test'

console.log(mapRoute(new SomeClass()));

