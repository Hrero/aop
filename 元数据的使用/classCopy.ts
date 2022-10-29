// 定义的元数据在其他引用依然可用
import "reflect-metadata";
import { Test } from './class'

console.log(Reflect.getMetadata('inClass', Test)); // 'A'
