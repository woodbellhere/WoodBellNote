vue 与 vue 组件的核心思路

- 模板 + 对象描述 + 数据 -> 组件
- 输入数据到渲染组件的呈现和更新是声明式的，这个过程就算个技术核心

组件渲染过程

- 组件是对 DOM 树的抽象，dom 树的内容取决于你自己编写的内容
- 组件渲染为 DOM 的步骤

  - 创建 vnode
  - 渲染 vonode
  - 生成 DOM

- 创建 vnode

```javascript
const app = ensureRender().createApp(...args);
```

- ensureRender()基本用于创建一个渲染器对象

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
