# 网页设计的要点

## 响应式设计

## 可维护可伸缩的代码

## 性能

## 思考-构建-架构三步模型

### 思考

在写 css 时应该有的基本思维方式
组件驱动的设计

- 组件也就是构成用户界面的模块式构建基块
- 通过布局把不同组件整合在一起
- 在不同项目间都能复用
- 组件的独立性让我们能随处使用它

### 构建

即某种命名 css 规则的规范方式，但是 bem 也被好多人吐槽难用
BEM block element modifier

- block 指明某个组件可以自成一体
- element 是 block 中无法自成一体的部分
- 比如 info 咯，description 咯
- Modifier 指 block 或 element 的不同版本，主要是样式性的

### 架构

即 css 项目的文件划分方式，不过这个有很多，以下仅列举一种
7-1 7 个不同的 css/预处理文件加一个入口汇总文件

- base/
- Components/
- layout/
- pages/
- themes/
- abstracts/
- Vendors
