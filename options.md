data 选项

- 选项中的内容自动加入响应式系统

computed

- 依赖属性更新则更新，无更新则使用缓存值
- 还是记得加.value 以及 set 似乎用的也不多
- 首先是选项式写法

```javascript
<div>全名:{{ fullName }}</div>
<button @click="changeName">改改computed</button>
let fullName = computed({
  get() {
    return firstName.value + "-" + lastName.value;
  },
  set(newVal) {
    console.log(newVal);
    [firstName.value, lastName.value] = newVal.split("-");
  },
});

const changeName = () => {
  fullName.value = "bell-wood";
};
```

## 选项式诸内容

- 模板语法就是 h 渲染函数的一个语法糖

- data 属性是一个函数
- 函数需要返回一个对象

- computed
- 可以直接当 data 返回
- 有缓存
- 没参数
- 没法在其他配置项中使用（不够公共复用）
- 相比 watch 一般不修改（但可以修改） data 属性，而是产生新值（getter， setter）

- methods
- 从计数器案例看，似乎一个方法更新会让页面上所有方法重新执行
- 想要在缓存上有优势就要提前传参数
- 无法调用 watch
- 可以在模板中使用
- 可以设置返回值

methods 和 this

- 因为 data 用函数返回，你就不能用箭头函数，不然拿不到 vue 实例，直接拿 window
- vue 把函数都 bind 了 publicthis，从源码的 componentsOption 看，publicthis 就是 instance.proxy

- watch
- 主要瞄准耗时/无法明确发生时间的异步操作
  - 比如某某数组（像文档的 blog）新增内容之后，设置定时器按时将新值存进数组
- 直接修改 data，不讲返回值
- 更命令式一些，不太涉及过于具体的内部细节
- 可以调用 method 函数
- 不能在模板中直接使用
  ![Alt text](image.png)

- 选项式中
- $data 可以从实例中返回所有数据
