# 组合式 api 的出现动机和 mixin 复用的痛点

## 技术考古 mixin

### 定性

- 是一个组件，有 data，prop 等属性
- 就是把 script 部分 export 从大括号开始的内容，全部放在一个单独文件中备复用
- 可在需要时导入，在 mixin 配置项按数组传入所需 mixin 就行

### 作用规范

- 和组件原有数据相比优先级不高，有命名冲突时以组件自己的 data 为主
- data 中所有数据进行合并
  - 如果有重名则组件自身属性覆盖 mixin 属性
  - methods, computed, prop,components 中的属性同样进行合并，重名则组件覆盖 mixin
  - 如果对象 key 相同，组件内优先

### 生命周期钩子

- 组件和 mixin 都执行，且 mixin 比组件先执行
- 所以生命周期调用都能调用

### 引入方式

- 引入组件的就是局部 mixin，引入根组件的就是全局 mixin app.mixin()
- 全局插件相当于把上述的配置项在所有页面注入
- 这种适合写插件 可以在其中给 vue 加入任意配置项，并通过 this.$options 来获取

### minxi 的问题

- 命名冲突
- 来源不明
- 分隔不清

## 组合式 API

### setup(props, context)

- setup 中没有 this
- props 参数就能拿到所有 props 数据
- context 参数能拿到 attrs，slots（父组件插槽）以及 emit（没有 this.$emit 了）
- setup return 值能够被 template 使用，相当于代替 data

- setup 中定义函数正常定义就行，但要记得 return 出去
- setup()函数只是替代 data，computed 和 methods 这些响应式内容，components，props 和 emits 仍然使用配置项形式
- 不过进一步 setup 语法糖就全变成 definexxx 了

### 组合式的生命周期

- setup 在 created 和 beforeCreate 之前调用，所以直接在 setup 操作就行
- 所有钩子前面都加 on
- setup 代替了 beforeCreate 和 created 两个钩子
- 变为可以直接在 setup 中调用的函数

### setup 中的 prop

- prop 配置项照样要写
- 但传 prop 和收 prop 的组件中都要接收 setup(prop)参数
- 并且使用 prop.xxx 方式读取 prop

### 如何将非响应性 prop 转换为响应性

- 父组件向子组件传递的响应性 prop 在子组件也是响应性的，无论是否进行解构
- template 会对响应性数据自动进行拆解，把 ref.value 拿出来，所以数据会变为 proxy 而非 refimpl
- 传递 js 基本类型数据时会失去响应性，乖乖地用 torefs
- 传递对象时就完全不怕，但如果用 ref 包裹

### context 参数

- setup 的第二个参数是 context，context 中有两个主要属性

slots 属性

- slots 成为一个对象，需要在 setup 传入解构参数 setup(props, {slots})保存了组件中传入的 slots 信息，属性名就是名字，属性值成为函数
- 在组合式 api 中使用需要 return 一个回调函数来调用 h 函数

```js
setup() {
  return () => h('header', {}, slots.header())
}
```

attrs

- 使用同 slots setup(props, {attrs})
- 包括所有没有明确定义的其他属性（比如 data-xxx）， 替代 $attrs 属性,模板中可以使用 this 来使用
- 本身是响应性的，和 prop 一样不能随便解构
  setup 中的 emit

- 因为无法使用 this，所以 watch 和 emit 时要其他办法
- 在 子组件 setup 定义的函数中套 emit("name", params)函数来发射事件，同时在 emits 配置项里也要这么写
- 并在父组件中监听 emit 发射的事件
- 不过在模板中可以更随意一点用$emit

### 组合式中的 provide 和 inject

- 均变为函数，provide('propName', value)提供, const xxx = inject('propName')来接收
- 响应式数据也保持响应性，同样需要注意解包和深层数据响应性的问题

### setup 源码的执行顺序

- createComponentInstance 创建组件实例
- setupComponent 初始化 component 内部操作
- setupStatefulComponent 初始化有状态组件
- 在 setupStatefulComponent 取出 setup 函数
- callWithErrorHanding 执行 setup
