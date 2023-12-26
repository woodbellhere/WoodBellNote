## script setup

- 是 setup 函数的语法糖

  ```javascript
  <script>export default {
    setup() {xxx}
  }
  </script>

  <script setup>
    xxx
  </script>
  ```

- 定义的数据可直接在模板中使用，无需返回
- 也可直接导入其他库来使用
- 无法配置 components 配置项，可以直接引入组件使用
- props 通过 defineProps 传递
- ```javascript
  defineProps([
  {title:String，default:'标题'},
  {name:String, required:true}
  ])
  ```
- 如果要在 script setup 中访问 prop，则通过 const = defineProp 接收，并使用 props.title 即可

- emits 则使用 defineEmits
- ```javascript
  defineEmits(["click", "remove"]);
  ```
- 如需在 script 内使用，也是定义变量接住值
- props 和 emits 是编译器宏的一部分，可以直接使用

- context 参数的两个内容，slots 和 attrs 都有 use 钩子，引入即可

- http 加载状态报告

```javascript
const loading = ref(false);
onMounted(async () => {
  loading.value = true;
  const res = await axios.get("http://localhost:3000/notes");
  notes.value = res.data;
  loading.value = false;
});
// 再用任意标签v-if一下loading就能实时显示请求状态
```

setup

- setup 中没有 this
- 但仍然需要 prop 选项做定义
- props 参数就能拿到所有 props 数据
- context 参数能拿到 attrs，slots（父组件插槽）以及 emit（没有 this.$emit 了）
- setup 返回值能够被 template 使用，相当于代替 data
- setup 在 created 和 beforeCreate 之前调用，所以直接在 setup 操作就行

setup 执行顺序

- createComponentInstance 创建组件实例
- setupComponent 初始化 component 内部操作
- setupStatefulComponent 初始化有状态组件
- 在 setupStatefulComponent 取出 setup 函数
- callWithErrorHanding 执行 setup

setup 函数参数

- setup 的第二个参数是 context，context 中有两个主要属性
- slots 属性
- slots 成为一个对象，需要在 setup 传入解构参数 setup(props, {slots})保存了组件中传入的 slots 信息，属性名就是名字，属性值成为函数
- 在组合式 api 中使用需要 return 一个回调函数来调用 h 函数
  ```javascript
  setup() {
    return () => h('header', {}, slots.header())
  }
  ```
- attrs
- 使用同 slots setup(props, {attrs})
- 包括所有没有明确定义的其他属性（比如 data-xxx）， 替代 $attrs 属性,模板中可以使用 this 来使用
- 本身是响应性的，和 prop 一样不能随便解构
