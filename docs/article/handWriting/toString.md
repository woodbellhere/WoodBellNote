# 类型判断的终极解决方案 Object.prototype.toString.call

## 描述

MDN 关于这一方法的描述中指出‘该方法返回[object Type],而 Type 正是对象的类型。Type 的值是目标对象的 Symbol.toStringTag 属性，大部分对象都有这个属性，少部分 es6 之前的对象虽然没有经过这种标准化，但也有一个特殊标签’
这些 Type 标签包括：

- Array
- Function，Type 为 function
- Error
- Boolean
- Number
- String
- Date
- RegExp
- Arguments
- Undefined
- Null
- 据说其他所有类型（包括自定义）都会变成 object

```js
console.log(Object.prototype.toString.call(123)); //[object Number]
console.log(Object.prototype.toString.call("string")); //[object String]
console.log(Object.prototype.toString.call(false)); //[object Boolean]
console.log(Object.prototype.toString.call(new Error("some error"))); //[object Error]
console.log(Object.prototype.toString.call([])); //[object Array]
console.log(Object.prototype.toString.call(new Date())); //[object Date]
console.log(Object.prototype.toString.call(/123/)); //[object RegExp]
console.log(Object.prototype.toString.call(undefined)); //[object Undefined]
console.log(Object.prototype.toString.call(null)); //[object Null]
console.log(Object.prototype.toString.call({})); //[object Object]
```
