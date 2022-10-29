import "reflect-metadata";

@Reflect.metadata('inClass', 'A')
export class Test {
    @Reflect.metadata('inMethod', 'B')
    public hello(): string {
        return 'hello world';
    }
}

console.log(Reflect.getMetadata('inClass', Test)); // 'A'
console.log(Reflect.getMetadata('inMethod', new Test(), 'hello')); // 'B'

// function metadata(
//     metadataKey: any,
//     metadataValue: any
// ): {
//     (target: Function): void;
//     (target: Object, propertyKey: string | symbol): void;
// };

/**
* @param {string} metadataKey - 元数据key
* @param {Object} target - 元数据定义的target
* @param {string} targetKey - 可选项, 是否选择target的某个key
* @returns 如果找到了元数据则返回元数据值, 否则返回undefined
**/
// function getMetadata(metadataKey: string, target: Object, targetKey?: string | symbol): any;
