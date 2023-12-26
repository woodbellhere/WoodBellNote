watch

- 监听 ref 或 reactive 的响应式数据的变化
- 参数就是单个要监听的数据或者数组形式的要监听对象
- 回调函数中默认有新值旧值两个参数

```javascript
let message = ref < string > "woodbell";
let message2 = ref < string > "bellwood";
// 监听多个值就用数组传
watch([message, message2], (newVal, oldVal) => {
  console.log(newVal, oldVal);
});
```

- 层级深的 ref 对象默认监听不了，需要手动指定 deep 为 true,而且监听还是对象的地址，不是值
- reactive 对象默认能监听到深层，其实就是源码里 deep 为 true
- 监听单个属性的话 vue 推荐你写个回调函数
- 配置项的参数除了 deep 还是有 immediate，就是让回调立即执行一次再说
- 还有 flush， pre 是组件更新之前执行，sync 是同步执行，post 是更新之后执行

```javascript
//加deep为true才读的到
let message3 = ref({
  foo: {
    bar: {
      name: "woodbell",
    },
  },
});
watch(
  message3,
  (newVal, oldVal) => {
    console.log(newVal, oldVal);
  },
  {
    deep: true,
  }
);
//这个就读的到
let message3 = reactive({
  foo: {
    bar: {
      name: "woodbell",
    },
  },
});
// 监听单个值就写个回调，似乎只有reactive包裹的对象才能监听单个属性
watch(
  () => message3.foo.bar.name,
  (newVal, oldVal) => {
    console.log(newVal, oldVal);
  }， {
    immediate:true,
  }
);
```

watch 源码

- 直接把参数，回调和配置项传给 doWatch
- doWatch 对数据 source 做格式化，全部赋给 getter
- 如果 isRef，则取出 ref.value 给 getter
- 如果 isReactive，则直接赋给 getter，同时 deep 为 true
- 如果 isArray，则遍历判断是 isRef 还是 isReactive 或者 isFunction，做相应处理
  - ref 取.value
  - reactive 做递归监听所有属性
- 如果 isFunction，如果有回调则执行 watch，没有就执行 watchEffect

watchEffect

- 从 watch 源码看，就是直接传函数作为参数的时候
- 无论如何自动调用一次
- 传的函数自己也有一些 api 参数，比如 oninvalid，有点路由守卫那种意思，在监听值彻底变化之前执行，一般做点防抖节流啥的
- 本身返回一个停止监听的函数，有点奇妙.只要变成函数表达式后调用就可以
- 配置项参数 flush 也一样，post 就和默认相反，是更新后执行

---

```javascript
let message4 = ref < string > "wooFly";
watchEffect((oninvalid) => {
  console.log("message4====>", message4.value);
  // oninvalid还是比前面的早
  oninvalid(() => console.log("before"));
});
```

```javascript
<button @click="stopWatch">停止监听</button>
const stopWatch = watchEffect((oninvalid) => {
  oninvalid(() => console.log("before"));
  console.log("message4====>", message4.value);
});
```

watcheffect

- 自动收集依赖
- 把 watcheffect 搞个函数再调用就停止了
- 停止调用这个功能一般用来做清除副作用，取消请求
- 专门有一个 oninvalidate 参数指向副作用即将执行和监听器被停止时的操作往里塞相应函数就行
- 多看 watch 这一节
- setup 取 ref 的 dom 时，要设置一个 ref 变量占位，同时为了即时使用，watcheffect 要设置为 post

watch

- 相比而言是懒执行，监听值明确变化才会执行
- 需要明确执行监听对象

watch

- 更多监听代码逻辑而非模板数据变化
- 模拟实时查询效果就需要加上函数调用，这个习惯得养成
- 层次太深虽然也相应，但是监听不到
- 可以数组传参，依次调用
- 在生命周期中通过 this.$watch 调用
