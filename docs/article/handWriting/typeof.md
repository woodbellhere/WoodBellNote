# typeof 判断值类型

## typeof 的表现

手动 typeof 一些 js 数据类型的结果

```js
console.log(typeof 42); //number
console.log(typeof Number(1)); //number
console.log(typeof Number("abc")); //number
console.log(typeof "woodbell"); //string
console.log(typeof String(1)); //string
console.log(typeof true); //boolean
console.log(typeof Boolean(true)); //boolean
console.log(typeof 42n); //bigint
console.log(typeof Symbol("sth")); //symbol
console.log(typeof undefined); //undefined
console.log(typeof xxx); //undefined

console.log(typeof function () {}); //function
console.log(typeof (() => {})); //function
console.log(typeof class c {}); //function
console.log(typeof Array.from); //function

console.log(typeof null); //object
console.log(typeof new Number(1)); //object
console.log(typeof new String("abc")); //object
console.log(typeof new Boolean(true)); //object
console.log(typeof { a: 1 }); //object
console.log(typeof [1, 2, 4]); //object
console.log(typeof []); //object
console.log(typeof new Date()); //object
console.log(typeof /abc/); //object
```

## 问题所在

null 的结果非常不直观

- [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof) 明确吐槽这是 js 诞生以来就有的历史遗留问题
- 有对 es 新标准的[修复提案](https://web.archive.org/web/20160331031419/http://wiki.ecmascript.org:80/doku.php?id=harmony:typeof_null)，但是看内容也是因为兼容性问题被否了

对于对象类型的判定非常宽泛，但是标准不统一

- 可以看到数组，date 和正则都被判定为对象，当然它们确实也是对象
- 但是函数又被单独列举出来，实际上函数也是一种对象嘛
- 函数和 class 虽然在实现上真是一样的，但是类型上 class 应该和 function 有所区别

也就是说，typeof 基本对于对象类型的判断无用,对于其他类型，甚至新的 bigint 和 symbol 的支持都很好

## 解决方案

实际上 MDN 自己给了一个自定义的 [type 函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof)，我们贴出来研究一下

```js
function type(value) {
  // null没法判断，直接返回
  if (value === null) {
    return "null";
  }
  // 对象/函数类型不好判断，其他类型都比较准确，直接原结果返回
  const baseType = typeof value;
  if (!["object", "function"].includes(baseType)) {
    return baseType;
  }
  // toStringTag是toString函数实际获取的对象，可以获取自定义的类型名
  const tag = value[Symbol.toStringTag];
  if (typeof tag === "string") {
    return tag;
  }
  // 如果是函数且tostring.call这个大杀器告诉你它还是class，就返回class
  if (
    baseType === "function" &&
    Function.prototype.toString.call(value).startWith("class")
  ) {
    return "class";
  }
  // 值说到底都有构造函数，完全可以用自有属性的特征，获取构造函数/自定义类的名字
  const className = value.constructor.name;
  if(typeof className === 'string' && class !== ''){
    return className;
  }

  // 剩下的没办法了，都直接返回
  return baseType
}
``;
```
