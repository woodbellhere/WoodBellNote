# setup 函数和 setup 语法糖

## script setup

- 是 setup 函数的语法糖

```js
<script>export default {
  setup() {xxx}
}
</script>

<script setup>
  xxx
</script>
```

### 主要区别

- 定义的数据可直接在模板中使用，无需返回
- 也可直接导入其他库来使用
- 无法配置 components 配置项，可以直接引入组件使用

### props 和 emit

- props 通过 defineProps 传递
- ```js
  defineProps([
  {title:String，default:'标题'},
  {name:String, required:true}
  ])
  ```
- 如果要在 script setup 中访问 prop，则通过 const = defineProp 接收，并使用 props.title 即可

- emits 则使用 defineEmits
- ```js
  defineEmits(["click", "remove"]);
  ```
- 如需在 script 内使用，也是定义变量接住值
- props 和 emits 是编译器宏的一部分，可以直接使用

### 其他钩子

- context 参数的两个内容，slots 和 attrs 都有 use 钩子，引入即可
