## 根组件和 vue.createApp

- vue2 中每个模板都要求仅有一个顶层的根元素（比如只有一个 div），vue3 随便写（可以有多个同级 div）
- 一个 root 组件/组件实例只能用在一个 dom 上，你想多要就多写几个 root 挂在不同 dom 上
- 每个组件实例都单独维护一个响应式副作用/类 watcheffect 来渲染和更新 dom，比 innerHtml 强
- mount 起个接管相关元素的作用
- 这个应用实例就是 this 的值

- proxy 的一个表现
- vue2 取组件实例的数据要用 vm.$data.xxx
- vue3 可以直接 vm.xxx

- null/undefined 会被 vue 直接解析为空白，确实适合当占位符

- 响应式
- ref 用 getter，setter， reactive 以及其他响应式都是 proxy
- getter 部分有一个 track()函数
  - 检查是否有正在运行的副作用（订阅数据的函数？），并维护这样一个记录所有订阅了特定属性的订阅者 set
  - 这个 set 就是一个样子很奇特的 weakMap,中间嵌套了一个嵌套 set 的 map
- set 部分有一个 trigger()函数
  - 这次查 map/set，然后执行
- watchEffect 跟这个内部的响应式机制几乎一致，能够手动创建“响应式副作用”
- 每个组件实例都单独维护一个响应式副作用/类 watcheffect 来渲染和更新 dom，比 innerHtml 强

组件

- 全局组件在 webpack 也会被打包

## 组件

- 注册组件
  ```javascript
  const app = Vue.createApp({});
  app.component("name", {
    data() {},
    methods: {},
    watch: {},
  });
  ```
- 这里的 name 最好用驼峰法，这样使用组件时既可以写驼峰，也可以短横线
- 首字母大写只能在 app.component 的配置项中的 template 上和 sfc 上的 html 中使用
- 在 index.html 等纯 html 中使用组件必须用小写字母加短横线
- 组件中也可指定模板
  ```javascript
  app.component("MyButton", {
    template: `html code`,
  });
  ```
- 组件默认相互独立，数据不相互影响

- 局部组件注册的内容
- 首先在局部组件构建文件要 export
- 其次在 index.js 或者其他组件文件 文件中要引入(记得.js 后缀)
- 再次在 app.component()或者组件配置项的 components 注册项中导入引入的组件名
- 最后还要记得 html 中的 js 文件 type 改成 module

- script 和 script setup
- 有 setup 可以引入组件后直接使用
- 没 setup 就要 export default component 注册

- sfc 文件 @vue/compile-sfc 进行编译

## 手动获取模板 DOM refs/组件实例

- refs/prop 的父子关系再说明
- 子组件不能修改父组件传递 prop
- 父组件也不能访问子组件数据或其他配置项，除 slot（子组件的配置在父组件中基本默认不生效，比如 autofocus）
- 但 vue 提供方法让我们通过子组件实例来获取其中的数据
- 也就是 ref，可以获取原生 html 实例，也可以获取组件实例，但是会破坏数据流向
- 一般就是执行动画音视频时有用，下面是一个子组件 autofocus 的方法
- input 的 ref 应该是获取 input 标签的 dom，AutoFocus 中的 ref 获取的就是自定义组件的 DOM
- 可以看到，可以读到 data 和 methods
- 只能在挂载之后使用，template 中不行

  ```javascript
  <input type="text" ref="inputControl" v-model="inputText" />
  data() {
    return {
      inputText: "",
    };
  },
  methods: {
    blur() {
      this.$refs.inputControl.blur();
    },
  },
  mounted() {
    this.$refs.inputControl.focus();
  },

  <AutoFocus ref="autofocus" />
  mounted() {
    setTimeout(() => {
      console.log(this.$refs.autofocus.inputText);
    }, 5000);
  },
  ```

## 动态组件及保存缓存

- component 元素加 is 指令，is 后面跟的是标签/组件名，意思就是现在这个宽泛的 component 就是（is）xxx 标签了/组件
- component 就是标签/组件的占位符是吧
  ```javascript
  <!-- is接收prop，并成为相应的标签 -->
  <Component :is="heading"><slot></slot></Component>
  props: ["level"],
  heading() {
      return `h${this.level}`;
    },
  <!-- 父组件传入prop -->
  <TextHeading level="1">一级标题</TextHeading>
  <TextHeading level="2">二级标题</TextHeading>
  ```
- 动态组件，相当于手动写 v-if 判断哪个组件上场，而且也真的生成和销毁
- component 本身是个占位符性质的东西，没有内容
- is 也是要用：绑定成动态的， data 里设置一个随意切换的组件字符串名，然后就能随便切换组件了

- slot 和 componeng 好像都能当占位符

- keepAlive 相当于给组件提供 v-show，可以缓存，不用每次删除
- 更要紧保存组件上村的数据，比如说页面前后切换也能保留填写信息这种

## 在任意 dom 上挂载组件

- 有时候组件在逻辑上不属于任何父组件，比如对话框，页面边上跳出来的子页面
- 这个传递甚至无所谓 app 的根节点
- 样式上可能需要参考 body 做绝对定位
- teleport 将包裹的内容传送到经过 to 属性（css 选择器）传送到指定的 html 元素上，比如说 to=body
- 多次传送在技术上可能，且会正常叠加在挂载节点上

## 按时加载组件/异步组件

- defineAsyncComponent(() => import('/xxx.vue'))回调方式引入组件
- 使用时替代原有的 import 引入方法
- 跟大部分异步方法类似，基本上就是有用再加载，求个懒加载

全局，局部和递归组件

- 全局组件基本就是使用频率很高的组件
  - 需要在 main 文件中用 app.component 全局注册
  - 全局注册很多也是用 for 循环
- 局部组件就比如页面局部
  - 在特定组件文件中引入即可使用
- 树和菜单这种好像有点无限下拉的就是递归组件
  - 组件有属性可以套几层的

```javascript
// 全局组件，需要在main文件
import Card from "./components/card.vue";
const app = createApp(App);
app.component("Card", Card);
// 局部组件
<template>
  <div>
    <Card></Card>
    <Card></Card>
    <Card></Card>
  </div>
</template>;
import Card from "./components/card.vue";
```

```javascript
<Tree :data="data"></Tree>
// 递归风格的数据
const data = reactive<Tree[]>([
  { name: "1", checked: false, children: [{ name: "1-1", checked: false }] },
  { name: "2", checked: false },
  {
    name: "3",
    checked: false,
    children: [
      {
        name: "3-1",
        checked: false,
        children: [
          { name: "3-1-1", checked: false },
          { name: "3-1-2", checked: false },
        ],
      },
    ],
  },
]);
// 然后到子组件里
defineProps<{ data?: Tree[] }>();
<template>
  <div v-for="item in data" class="tree">
    <input type="checkbox" v-model="item.checked" />
    <span>{{ item.name }}</span>
    <Tree :data="item?.children" v-if="item.children?.length"></Tree>
  </div>
</template>
```

动态组件

- 假设你遇到需要按条件显示不同组件时，就可以考虑了

keep-alive

- 动态组件切换时，内部值不保留
- 想保留就用 keep-alive

异步组件

- defineAsyncComponent
- 配合 loadingComponent 和 delay 配置项可以做骨架屏？
- suspense 是一个集大成
- 但是记得要放两个 template 当插槽

组件 v-model

- 一种好的实践是把动态接收 prop 和 emit update 给集中到一个计算属性中
