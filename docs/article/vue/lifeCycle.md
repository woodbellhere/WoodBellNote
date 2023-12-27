# vue 中的生命周期

## 选项式的生命周期

beforeCreate()

- app.mount()创建 vue 实例之后，createApp()的配置项生效之前

created()

- 最早能够访问 this 的钩子
- beforeCreate()之后， createApp()配置项生效之后
- 此时 data，computed， methods 和 watch 都配置好了

beforeMount

- created 之后，应用还没有挂在指定的 html 元素上，也尚未在页面上渲染
- 要挂载的时候就调这个钩子了

mounted()

- 已经挂载 dom，可以进行修改访问
- 应用挂载到指定的 html 元素后执行
- 应用已经在页面上渲染出来了

beforeUpdate()

- html 模板需要重新渲染时，比如 data 属性变化
- 此时会调这个钩子

updated()

- 数据更新后，html 重新渲染后调用

beforeUnmount()

- 应用卸载前执行，此时应用还可以正常活动

unmounted()

- 应用彻底卸载之后调
- 应用上的事件监听和指令绑定都卸载了

## 组合式的生命周期

- onBeforeMount 创建之前,DOM 元素不存在
- onMounted 创建时，DOM 已经存在

```js
// 比如随意获取一个元素的DOM
<div ref="wDom">{{ word }}</div>
const word = ref<string>("woodbell");
const wDom = ref<HTMLDivElement>();
// 这个读出来undefined
onBeforeMount(() => {
  console.log("创建之前", wDom.value);
});
// 这个就读的到
onMounted(() => {
  console.log("创建完成", wDom.value);
});
```

- onBeforeUpdate 组件更新前,此时值还是之前的，此时可以做一些卸载操作
- onUpdated 组件更新完成，值是之后的

```js
<button @click="change">顺着声明周期改改</button>
const change = () => {
  word.value = "改了试试";
};
// 可以看到触发顺序也是正常的
onBeforeUpdate(() => {
  console.log("更新组件前", wDom.value?.innerText);
});
onUpdated(() => {
  console.log("更新组件完成", wDom.value?.innerText);
});
```

- onBeforeUnmount 卸载前
- onMounted 卸载完成

## 特定用途钩子

调试相关

- onRenderTrack
- onRenderTrigger 都是用于调试的钩子

- onErrorCaptured 捕获后代组件传递的错误时触发

keepAlive 专用

- onActivated keepalive 组件被激活时
- onDeactivated keepalive 组件被冷冻时

SSR 相关

- onServerPrefetch 组件实例在服务器上被渲染前调用，ssr
