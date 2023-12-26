## 渲染函数，模板底层

- render 配置项中可以写 jsx，可以像 jsx 一个风格
- 模板本身也会转换为渲染函数执行
- h(tagName, attrObj, childNode)三个参数分别是标签名，属性对象和各种子节点（也可以是另一个渲染函数返回的结果）,可以层层嵌套递归
  ```javascript
  render() {
    return h("div", { class: "card" }, [
      h("div", { class: "title" }, this.title),
      h("div", { class: "content" }, this.$slots.default()),
    ]);
  },
  ```
- 在渲染函数中传递事件需要换成大写
