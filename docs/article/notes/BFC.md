# BFC

## Fc

box 在文档流中都属于一个 fc，只是有不同类型的 fc

## 触发

html
display 为 inline-box，table-类，flex-item/inline-flex，grid-item/inline-grid
是浮动，flow-root
绝对定位，position 为 absolute 或 fixed
overflow 不为 visible
的元素都会给内容创建一个 bfc

## 表现

由于 html 本身触发 bfc，而默认的布局方式就是 normal flow，块之间从上到下排列，且从左上角开始（收到书写方向的影响）
也就是说，盒与盒之间上下依次排列，盒之间的垂直距离由 margin 决定，同一个 bfc 中的相邻两个盒的上下 margin 会塌陷
盒的左边缘接触盒容器的左边缘

## 解决

换句话说很多解决 margin 塌陷问题的方法就是新建立一个自己的 bfc，不同 bfc 之间就不讲 margin 塌陷了
不过要注意，为了形成 bfc，给关注的几个元素。比如高度塌陷的父子元素以及 margin 塌陷的响铃两个盒整体多包一层容器才好下手建立新 bfc

## 浮动塌陷

由于浮动元素脱离文档流，所以父元素实际上感知不到自己有内容，也就不能应用任何样式
claer 一套操作相当于随便给了一点内容把内容撑开
用 bfc 直接在浮动容器加个 overflow 完事
从文档上看，由单独 bfc，以及容器高度是 auto（一般 block 是默认的
绝对定位元素也会被 bfc 的高度计算忽略
