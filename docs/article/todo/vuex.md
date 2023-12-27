vuex 的基本思路

- 组件单个保存与传递状态的复杂程度会随着项目规模增长而增长
- 为了简化操作和降低心理负担，不妨把所有状态统一到一个全局对象中进行操作，其他组件则统一从这里获取数据
- vuex 提供了这种全局单例，此时组件树就成为一个大号的 view，来读取 vuex 中的 state

单一状态树/单一数据源

- 一个对象包含全部的应用层级状态
- 每个数据也仅仅包含一个 store 实例
- 采用了所谓的单一数据源
- 其实你非要创建几个 store 去 use 也差不多

使用 state 数据的建议

- 在各个组件中完全可以用个计算属性包裹一层，免得直接 this.$store.counter 太长
- vuex 提供了省事的方式一次性“注册”/展开数据的 ...mapState
- mapState 的对象形式还可以顺便写子组件中数据的函数/计算属性形式
- 一次性 mapstate 的方法

```javascript
const storeStateFn = mapState(["counter", "name", "age", "height"]);
const storeState = {};
Object.keys(storeStateFn).forEach((Fnkey) => {
  const fn = storeStateFn[Fnkey].bind({ $store: store });
  storeStateFn[Fnkey] = computed(fn);
});
```

getters

- vuex 中的计算属性
- 流程也是传参 state 然后拿数据计算
- 如果还要调用其他 getters，则传参时也需要 getters，然后拿 getters.xxx 计算

mutation 为什么不建议异步操作

- devtool 无法进行跟踪
- 一个解决异步的中间层

mutation 建议

- mutation 中定义函数会默认传入 state，所以你要用直接定义参数即可
- 然后就 state.xxx++--之类的操作
- 用的时候按照子组件触发事件的那个风格 ，定义一个函数，函数中再调用 this.$store.commit('xxx')即可
- store 中的数据必须通过 mutation 的 commit 来改变
- 按照惯例往往有第二个参数，是一个对象 payload，想额外塞的参数全加进去就完事
- 很多时候 method 和 mutation 中的函数一个名字，为了避免错误，可以单独搞一个常量文件，const ABC = 'ABC'解决麻烦
- mapMutation 会自动把模板中的内容映射为 this.$store.commit xxx 的

actions 和异步操作

- 直接把异步操作交给组件管理，然后再 mutation，不去使用 action
- 要使用 vuex 来管理的话，action 的注意事项就是它直观提交 mutation
- action 也有重要参数 context，这个参数和 store 实例有相同方法和属性
- 常见方法就是 context.state 或者 context.getters

context 参数

- 由于 context 内容丰富，经常在用的时候主动解构出几个要紧的参数

modules

- 分别定义不同的 store 文件，这些文件中不用引入 vuex，但格式和一般 vuex 一致
- 导入一个有 vuex 的总文件，在 modules 选项中按 component 那种风格配
- 使用时则注意，是 store.state.moduleName.xxx
- 但是 getters 又不用指定 module 名字
- 通过类.属性的方式避免命名冲突
- 最重要的一点是 namespace 设置为 true，明确区分不同的命名空间
