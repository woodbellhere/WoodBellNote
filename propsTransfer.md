## prop 传递

- 组件 prop 传递
- prop 基本是挂在元素上的 data 属性，用处就像 vue 文档里的 blog
- 单向数据流
  - prop 对于子组件来说是只读的
  - 数据只从父组件往下传，子组件自己不要乱改
- 如果要改，要么明确通知父组件让它改，要么子组件给个占位数据，承接 prop 为本地数据再改
- 显然也是可以动态绑定的
- 如果想直接传整个对象，不用手动一个一个绑定属性，就要求组件属性和对象属性一样，这样 vue 就能自动解析
- prop 的配置项
  - type ，可以传数组接受多个类型
  - required，可以确认是否必须
  - default，设置默认值
  - validator:自定义校验函数
- 传递组件没有的属性时
  - 默认将属性传递到 template 上最外层的元素，（经常是个 div），所以你在使用组件的地方写样式的时候也要想好
  - 手动访问可以用$attrs 在被传入的组件中观察 prop
  - 阻止访问可以设置 inheritAttrs 为 false
- 父组件传的 xxx-xxx 这种横线格式
- 子组件会自动解析成 xxxXxx 这种驼峰格式
- 同时响应式又让更新的父组件数据实时传给子组件，奇妙双向数据流？

- 子组件向父组件发事件来传间接传数据 emit

  - 事件可以传参数，参数能被父组件接收到
  - 有 emit 属性和 prop 属性风格一样，直接指定要上传的事件，然后再具体指定事件的内容
  - $emit()就是通知父组件的方法,头一个参数是命名，后面 n 个参数都是数据，此时父组件某种程度上也需要一个占位数据/方法
  - 如果内联传无所谓，在 method 方法里传就要记得要指定 this，不然传不对数据

  ```javascript
   handleClick() {
       this.$emit("deletePost", this.id);
     },
  ```

  - 父组件可以直接@监听子组件定义的事件

- 父组件属性变化时子组件自动刷新
- 组件接受的 prop 本身也是动态属性时,组件接受的 prop 跟着变，页面跟着渲染，放心放心

- 组件生命周期和根组件一致

- 多层-级级 prop 传递
- 不安全，不可靠，不能保证每一层的 template 都是根组件，也不能保证 inheritAttr 畅通无阻
- provide 向所有后代组件提供 prop，inject 接受 prop
- 用 provide 提供 data 属性时要变 data() return 这种，不能直接传数组或者对象
- provide 中的属性不是响应式的，不会同步更新

父子组件传参

- 在父组件中通过元素属性标签即可传 prop
- 子组件中可以通过 defineProps 明确接受参数（组合式 api）
- 接受的 props 在模板中可用，在代码中可用需要变量接受上面的 defineProps
- ts 中可以用 withDefault 来专门设置默认值

```javascript
// 父组件中向子组件这样传值
<waterFall :title="name" :arr="[1, 2, 3, 4, 5, 6]"></waterFall>
// 子组件中这样接受props
const props = defineProps({
  title: {
    type: String,
    default: "默认",
  },
});
// 然后就可以使用
<div>{{ title }}</div>
<div>{{ arr }}</div>
// 这是ts加泛型后的写法
const props = defineProps<{ title: string; arr: number[] }>();
```

- 子组件向父组件传值
- 需要首先指定传递的内容 defineEmit
- 然后设置事件触发 emit 来上传 defineEmit 中的内容

```javascript
// emit被设计为需要触发的事件
<button @click="send"></button>
// 自定义一个让父组件监听的触发事件on-click
const emit = defineEmits(["on-click"]);
const send = () => {
  // 定义需要自定义触发事件中传递的具体数据
  emit("on-click", "param1", "param2", "paramN");
};
// 父组件直接监听子组件自定义的触发事件
<waterFall @on-click="getName">
</waterFall>
// 然后就可以通过参数接收上传数据
const getName = (name: string) => {
  console.log(name, "从子组件来的");
};
```

- 子组件向父组件暴露方法或者属性
- defineExpose 传出，然后父组件中用 ref 从 dom 里拿

prop

- 指定 type 为 object 或函数时，default 要按照工厂函数形式书写 default(){return {key:value}}
- 非 prop 的属性，比如 class，style 和 id 等有不同的处理条件
  - 组件有单个根节点时，上述属性自动添加到根节点中,inheritAttrs 就是管这个的
  - 一般在想让非根节点使用这些 class 才有用，在子组件中可以通过$attrs.xxx 来获取这些属性
  - 当然也可以 v-bind=$attrs 一次绑定

provide

- 要按函数形式使用，才能正确绑定 publicThis
- provide 如果希望使用 data 中的变动数据（比如 data 中某个数组的长度），就需要使用 computed 函数

兄弟组件

- vuex 和 pinia

## 组件 v-model

- 在组件上实现 v-model/封装表单输入控件为组件
- 一般情况下可以通过 v-model 让数据实时呈现在页面其他地方
- 但比如说引入的子组件是一个输入表单的时候，组件之间就不能默认 v-model 可行
- 接收固定名为 modelValue 的属性，并触发固定名为 update 的事件
  ```javascript
  :value="modelValue"
  @input="$emit('update:modelValue', $event.target.value)"
  prop:["modelValue"]
  emits:["update:modelValue"]
  ```
- 这种方式只能支持一个 v-model

- 遇到选择情境时，可能需要多个 v-model，此时需要给 v-model 加入参数
- 也就是

  ```javascript
  <!-- 父组件指定v-model -->
  <xxx
        v-model:searchTerm="searchTerm"
        v-model:category="category"
      />
  <!-- 子组件v-model的设置 -->
  <!-- 配置项 -->
  props: ["xxx1", "xxx2"]
  emits: ["update:xxx1", "update:xxx2"]
  <!-- 模板中的指令设置 -->
  <xxx>
  :value="xxx1"
  @input="$emit('update:xxx1', $event.target.value)"
  </xxx1>
  <xxx>
  :value="xxxx2"
  @change="$emit('update:xxx2', $event.target.value)"
  </xxx>
  ```
