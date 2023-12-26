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
