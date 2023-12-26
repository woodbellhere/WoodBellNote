# vue 的模板语法与解析（后续放点源码）

## template 语法能够允许的数据类型

- 模板语法不能写语句
- 值，表达式，计算属性，函数调用都行

## template 语法的挂载方式

- 最常见的就是我们给个 div，给个 id=app，然后 mount 到这个 id 上

- 另一种指定挂载元素的方法是 script 标签加属性 x-template，和指定 id，最后在 vue 初始化中的 template 中指定 id 让 vue 来读这个 script

```js
 <script type="x-template" id="woodbell">
    <div>
      ...
    </div>
  </script>
  Vue.createApp({
      template: "#woodbell",
      ...
    }).mount("#app");
```

- 然后是使用原生 template，浏览器不会渲染其中的内容
- 其实你换什么元素都行，只是 template 特别适合这么来而已，不会重复渲染

```js
<template id="woodbell">
    <div>
      <h2>{{message}}</h2>
      <h2>{{counter}}</h2>
      <button @click="increase">+1</button>
      <button @click="decrease">-1</button>
    </div>
  </template>
    Vue.createApp({
    template: "#woodbell",
    ...
  }).mount("#app");
```

## 使用模板语法的几种风格

- 第一种风格，vue2

  ```js
  <script>
  export default {
    data() {
      return {
        age: 18,
      };
    },
  };
  <script>
  <template>
    <div>{{ !age }}</div>
  </template>
  ```

- 第二种风格 setup 函数

  ```js
  <script>
  export default {
    setup() {
      const age = 18;
      return {
        age,
      };
    },
  };
  </script>
  <template>
    <div>{{ age? '1':'3' }}</div>
  </template>;
  ```

- 第三种 setup 语法糖

  ```js
  <script setup>
    const age = [1,2,3,4,5]
  </script>
  <template>
    <div>{{ age.map(item => ({num: item})) }}</div>
  </template>;
  ```

## template 语法的作用核心（这一部分可以适当放点源码）

- template 是 vue 帮我们渲染的 html，其中的标签会替换我们挂载元素的 innerHtml
- react 实际上都是写 jsx，然后 babel 编译为 react.createElement 函数处理
- vue 大多数时候用原生模板，也允许你手动拿 dom
- 最后都编译为虚拟 dom 渲染函数
