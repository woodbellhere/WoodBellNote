# new

## 描述

还是 MDN 嗷，详细写了 new 实际进行的操作步骤

- 创建一个新的空对象，可以出于方便叫 newInstance
- 如果被 new 的构造函数的 prototype 是一个对象，则把 newInstance 的[[prototype]]指向这个 prototype
  - 如果不是，则 newInstance 继续作为一个普通对象
- 使用给定的参数执行构造函数，并把 this 绑定为 newInstance（构造函数中的 所有 this 都指向 newInstance）
- 如果构造函数返回 非原始值，则该返回值成为整个 new 表达式的结果。
  - 否则，如果构造函数未返回任何值或返回了一个原始值，则直接返回 newInstance。
  - （通常构造函数不返回值，但可以选择返回值，以覆盖正常的对象创建过程。）

## 实现

```js
function Mynew(fn, ...args) {
  let newInstance;
  if (typeof fn.prototype === "object") {
    newInstance = Object.create(fn.prototype);
  } else {
    newInstance = {};
  }

  let result = fn.apply(newInstance, args);
  // 似乎要加一个result自己存在的判断
  if (result && (typeof result === "object" || typeof result === "function")) {
    return result;
  }
  return newInstance;
}
```
