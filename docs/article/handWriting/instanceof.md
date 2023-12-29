# instanceof

## 表现

MDN 定义是 用于检测构造函数的 prototype 是否出现在某个实例对象的原型链上

基本格式： instanceObj instanceof constructor

```js
let simStr = "this is simple string";
let myStr = new String();
let newStr = new String("Str created with constructor");
let myObj = {};
let myNonObj = Object.create(null);
let myDate = new Date();

console.log(simStr instanceof String); //false
console.log(myStr instanceof String); //true
console.log(newStr instanceof String); //true
console.log(myStr instanceof Object); //true

console.log(myObj instanceof Object); //true
console.log({} instanceof Object); //true
console.log(myNonObj instanceof Object); //false

console.log(myStr instanceof Date); //false

console.log(myDate instanceof Date); //true
console.log(myDate instanceof Object); //true
console.log(myDate instanceof String); //false
```

可见 instanceof 对于 new 实例化的需求还是很明显
这里的例外又是对象自己，字面量声明还是会被认为是 new 出来的实例

## 问题

```js
console.log(myDate instanceof Date); //true
console.log(myDate instanceof Object); //true

function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}

let myCar = new Car("honda", "accord", 1998);
myCar instanceof Car;
myCar instanceof Object;
```

这里可以看出 instanceof 的主要问题/特点就是它判断原型链而非直接/父级原型，而 object 显然是所有对象的原型，所以用于做类型判断的精度/颗粒度不够

## 额外用法

判断不是实例时

```js
if(!(myCar instanceof Car)){
  ....
}

// 不能够使用如下用法
if(!myCar instanceof Car){
  ...
}
// 因为myCar已经被转为布尔值，所以会永远报false
```

## 手动实现

```js
function MyInstanceof(leftObj, rightObj) {
  let rightProto = rightObj.prototype;
  let leftProto = Object.getPrototypeOf(leftObj);
  // 循环获取实例的下一格proto，知道实例的proto和原型的prototype相等或者为null结束
  while (true) {
    if (leftProto === null) {
      return false;
    }

    if (leftProto === rightProto) {
      return true;
    }
    leftProto = Object.getPrototypeOf(leftProto);
  }
}
```

思路就是不断地获取实例对象的下一个 proto，并且判断是否和给定的原型 prototype 相等，直到相等或者发现实例的 proto 为 null
