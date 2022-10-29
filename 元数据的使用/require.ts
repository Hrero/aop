import "reflect-metadata";

const requiredMetadataKey = Symbol("required");

// getOwnMetadata 往原型链上查找
export function required(target: Object, propertyKey: string | symbol, parameterIndex: number) {
    let existingRequiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || []
    existingRequiredParameters.push(parameterIndex)
    Reflect.defineMetadata(requiredMetadataKey, existingRequiredParameters, target, propertyKey)
}

export function validate(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
    let method = descriptor.value
    descriptor.value = function() {
        let requiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName)
        if (requiredParameters) {
            for (const parameterIndex of requiredParameters) {
                if (parameterIndex >= arguments.length || arguments[parameterIndex] === undefined) {
                    throw new Error("Missing required argument.");
                }
            }
        }
        return method.apply(this, arguments)
    }
}

/**
* 该方法是metadata的定义版本, 也就是非@版本, 会多穿一个参数target, 表示待装饰的对象
* @param {string} metadataKey - 设置或获取时的key
* @param {*} metadataValue - 元数据内容
* @param {Object} target - 待装饰的target
* @param {string} targetKey - target的property
*/
// function defineMetadata(metadataKey: any, metadataValue: any, target: Object, targetKey: string | symbol): void;

/**
* @param {string} metadataKey - 元数据key
* @param {Object} target - 元数据定义的target
* @param {string} targetKey - 可选项, 是否选择target的某个key
* @returns 如果找到了元数据则返回元数据值, 否则返回undefined
**/
// function getMetadata(metadataKey: string, target: Object, targetKey?: string | symbol): any;
