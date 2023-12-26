## 组合式 API

- minxi 的问题
- 命名冲突
- 来源不明
- 分隔不清

- setup()函数 return 的值在模板中是可以访问的
- setup()函数只是替代 data，computed 和 methods 这些响应式内容，components，props 和 emits 仍然使用配置项形式

- 响应式数据/状态被直接设置为函数
- ref(), reactive(),computed()
- ref 替代 data 属性，类型是 refimpl
- 传入对象会让对象内所有属性均变为响应式，需要使用 .value 来访问/获取值
- 还是用 getter， setter 做的
- 因此 ref 和原值并不是一个值，相等会报错

- reactive 只接受对象，类型是 proxy，效果和 ref 一样,但不使用 .value 语法取值，可以直接.语法访问
- 如果分别 log reactive 和 ref 值，则 reactive 直接返回 proxy，ref 需要.value 才返回 proxy
- 这个就完全是 proxy 了

- ref 也会调用 reactive 来将所有数据转化为响应式的
- ref 一般来说合适，而且数据分散好取
- reactive 则适合一次性定义多个数据，存放配置属性或表单数据

- computed() 函数值方法使用就行

- watch,直接监听 ref 或者 ref.value 的值
- 直接监听 ref 就 watch(xxxref, (newVal, oldVal) => xxx),直接监听解包值报错
- ref.value 就 watch(() => ref.value, (newVal, oldVal) => xxx),非要用回调使用解包值
- 监听对象属性也没啥区别，ref 正常.value，reactive 直接.属性
- 但是监听对象整体的话要注意一下，因为 watch 也是根据 对象引用来判断变化，所以一般情况下直接 watch 对象是没啥用的

  - 一种是配置项设置 deep 为 true,但是返回的新旧值其实是修改前的同一个对象

- 为了获取修改前的值，需要返回对象的克隆， 对 ref.value 做展开语法即可监听

  - 但这个只复制顶层属性，复制引用，所以还是回到深度克隆

- 监听多个响应数据
- 可以多个 watch，也可以按数组方式让 watch 监听多个 ref 或者多个回调 ref，但是监听回调只用写一个

- watchEffect 和 watch
- 作用基本一样，只能获取修改后的值
- watchEffect(callback(anyDataYouWantToWatch)),不需要像 watch 一样指定 ref，而是会自动判断
- 每次数据变化就会执行一次回调
- watch 只有变化才执行回调，但 watchEffect 无论如何先执行一次
- 相当于 while 和 do-while

- watch 等操作后的清理收尾
- watchEffect 中可以引入 onInvalidate 参数
- watch 要在第二个回调函数中引入 oninvalidate 参数
- ```javascript
  watchEffect((onInvalidate) => {
    onInvalidate(() => {
      xxx;
    });
  });
  watch(() + options.value.title, (newVal, oldVal, onInvalidate) => {onInvalidate(() => {xxx})});
  ```

- onValidate 在下次而非本次监听代码前执行

- setup 中的 prop
- prop 配置项照样要写
- 但传 prop 和收 prop 的组件中都要接收 setup(prop)参数
- 并且使用 prop.xxx 方式读取 prop

- 如何将非响应性 prop 转换为响应性
- 父组件向子组件传递的响应性 prop 在子组件也是响应性的，无论是否进行解构
- template 会对响应性数据自动进行拆解，把 ref.value 拿出来，所以数据会变为 proxy 而非 refimpl
- 传递 js 基本类型数据时会失去响应性，乖乖地用 torefs
- 传递对象时就完全不怕，但如果用 ref 包裹

- setup 中定义函数正常定义就行，但要记得 return 出去

- setup 中的 emit
- 因为无法使用 this，所以 watch 和 emit 时要其他办法
- 在 子组件 setup 定义的函数中套 emit("name", params)函数来发射事件，同时在 emits 配置项里也要这么写
- 并在父组件中监听 emit 发射的事件
- 不过在模板中可以更随意一点用$emit

- 组合式的生命周期
- 所有钩子前面都加 on 且驼峰式大写
- setup 代替了 beforeCreate 和 created 两个钩子
- 变为可以直接在 setup 中调用的函数

- 组合式中的 provide 和 inject
- 均变为函数，provide('propName', value)提供, const xxx = inject('propName')来接收
- 响应式数据也保持响应性，同样需要注意解包和深层数据响应性的问题

- 组合式 api 获取$ref
