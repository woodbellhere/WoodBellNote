# flex 布局的认识

## 基本条件

一个作为 flex 容器的父级元素
其中有任意作为 flex-item 的子元素

## 容器的两种风格

和其他元素在 block 和 inline 上的差异一样，也会有换行不换行的区别

## 重要属性

Gap 为子项创造 space
子项的 Flow 流向和顺序

## flex-direction 整体控制容器中子项的流向和方向

有
行 列
默认方向 row（从左到右） column（从上到下）
逆序 row-reverse（从右到左） column-reverse（从下到上）
四种设置
子项的叉轴大小如果不特定设置，就会自动填充满父级元素

## flex-wrap 设置了容器中子项（在超出主轴 size 大小时）是否换行/或者形成多个 line/flow 的布局

nowrap- 继续维持单 line/flow 布局，子项超出容器也没事（但是浏览器里好像都自动填充压缩）
wrpa- 如果超出主轴大小，则自动沿着叉轴多开一条主轴。比如你 direction 时 row，此时主轴是 row，叉轴是 column，选择 wrap 就会让浏览器沿着叉轴方向（自上而下）地多给你开一条主轴
wrap-reverse，一样，只是子项次序相反
flex-flow 上述两个属性的简写属性

## 两轴对齐方式

justify-content 主轴对齐使用
这里注意，space-between 和 space-around 之间的区别在于 around 以中间项为基准设置空隙，而 between 可能是以两端为基准，所以 between 总体要宽一点
align-items 叉轴对齐使用
属性值和 justify-content 大致一样
默认是 stretch，解释了为什么 flex 容器中不特意设定就会占满整个容器
额外的 baseline 则提供了手动设置对齐位置的方式
align-self 单个子项在叉轴上的对齐方式
属性值和 align-items 一致
常用于给特定部分加 end 来单独对齐

## 当叉轴出现多行时的对齐

（当出现）多行/列（时）子项的对齐设置
前面提到的 wrap 属性控制了容器元素换不换行以及怎样换行
而有换行则意味着我们需要面对同时对齐多行/多列的需要
align-content 则用于处理这一点
属性值和 justify-content 差不多

## 子项的对齐方式

Order 对子项的顺序做手动安排，按从小到大数字顺序进行排列
子项对 flex 空间的进一步控制
Margin 也能用
一般来说 flex 子项都有机会用容器内其他空间来做重新安排，比如自动填充之类的
margin 就会手动清除掉这些效果

## flex 对“可用空间”的利用方式

flex-grow 和 flex-shrink 都是基于富余空间的，设置的数值是能够从富余空间中占用的比例
grow 一般整体是 1，省事
比如说 500px 的容器里 有三个 100px 的子项
如果第一个设置 flex-grow 为 1，则容器富余的 200px 宽度全部给子项 1
如果第一二个都设置 flex-grow 为 1，则容器富余的 200px 宽度按 1：1 分配给子项 1，2
flex-basis 控制伸缩时子项变化的参考对象，基本上就是 flex 的 width
导航栏的两端样式其实就是 space-between，只不过两端的元素各自要用 div 包起来
