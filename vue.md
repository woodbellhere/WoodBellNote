## 技术考古 mixin

- 是一个组件，有 data，prop 等属性
- 就是把 script 部分 export 从大括号开始的内容，全部放在一个单独文件中备复用
- 可在需要时导入，在 mixin 配置项按数组传入所需 mixin 就行

- 引入规则
- data 中所有数据进行合并
  - 如果有重名则组件自身属性覆盖 mixin 属性
  - methods, computed, prop,components 中的属性同样进行合并，重名则组件覆盖 mixin
- 生命周期钩子

  - 组件和 mixin 都执行，且 mixin 比组件先执行

- 引入组件的就是局部 mixin，引入根组件的就是全局 mixin app.mixin()
- 全局插件相当于把上述的配置项在所有页面注入
- 这种适合写插件 可以在其中给 vue 加入任意配置项，并通过 this.$options 来获取

## 错误处理

- sentry 是一种错误日志收集工具
- 错误处理方法也需要注册，也有全局和局部两种方式

```javascript
app.config.errorHandler = (err, vm, info) => {
  xxx;
};
```

- 三个参数分别是错误信息，vue 实例还有错误位置

- 错误处理也有基于组件树的前后捕获
- 子组件自己能处理就不会往上报错
- 主要通过 errorCaptured 这个生命周期钩子触发
- 在哪一级处理就在组件树哪一级设置钩子，钩子中如果 return false 就不会向上传播，该组件的钩子成为错误边界，所有错误都交给他处理

- composables 组合式 api 的逻辑复用

- 在一组函数中将所有能写在 setup 函数中的相关内容写在一起
- 使用同一个 composeable 的组件是相互独立的

  ```javascript
  const { data: messages, removeItem: removeMessage } = useListData([]);
  ```

- watch 中的回调函数也要用 async 合适
