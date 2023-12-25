# Box 的基本要点

## box 的默认设置

容器的背景颜色很多是要求透明的
对老的浏览器，还可以把常见语义块再开头声明为 display block 来保险
inline 的 box 似乎会省略外部的垂直空间，你用 margin 咋折腾都没用，padding 才有用
inline-box 和 inline 一样只占内容长度，没有换行，但和 box 一样有盒模型的内容

## 使用 box 的动机

控制宽高是基本要求

## box-sizing 的实际设置

border-box 在控制 width 上更有优势，也是事实标准
_, ::before,::after {border-box}可以实现全局 border-box（包括大概率用的伪元素），也是一种通行做法
如果考虑第三方预处理，则
:root {border-box}
_.::before,::after{inherit}
可以让第三方的 content-box 正常表现
元素之间有间隔在视觉上更具吸引力
但由于文档流会让块自动适应，显式设置可能让内容 overflow 出块，所以 height 不见得需要显式设置
url 溢出可能是横向的，可以用 overflow-x

## box 的 height 设置

尽可能不要手动设置 height

    目的之一是控制overflow，一般设置为auto省事
    percentage也有危险，因为height一般参照容器的height，而这个height又由子项目决定，就会变成循环查找
    如果想让容器占满屏幕，更好的办法是用vh，视口的api

    控制height的使用例子

    创建等高列
    	早期只能用table硬塞
    	现在可以用display table手动调调符margin解决
    	和flexbox，flex自动等高

    垂直居中
    	如果能让容器height自然变化，则给容器设置相同的上下padding（把body设置为容器就行）
    	如果容器height固定或不让用padding，则vertical-align只影响行内和表格元素，所以你只能用table布局配合vertical-align
    	能用flex就flex居中，justify-conteng和align-items
    	内容是否只有一行文本？将其行高设置为容器高度
    	如果知道容器和内容的确切高度，则绝对定位也行
    	如果不知道内容的高度，则绝对定位加transform

## box 的 margin

控制 margin 行为
负 margin 的动机之一是等宽 margin 的设置在早期有无法控制的副作用，会让整个 container 一起
具体作用是让元素向负方向移动，以及让正常文档流上的元素向负方向元素移动，引起重叠
还会导致内容超出容器边界
margin 重叠
上下相邻的（不需要是元素相邻）margin 会重叠为一个单独的 margin，值按较大的一个设置
加入空 div 也会有自己的 box，也会影响 margin
超出容器的 margin 主要受 flex 和 padding 限制，flex 项的 margin 自动不折叠，加 padding 之后上下 margin 就不会超出
其他避免 margin 重叠的办法
overflow 设置非 visible 就组织重叠，一般是破坏性最小的
在相邻 margin 之间加 border 或者 padding 会阻止重叠
flex，grid，floated，inline-block 或者绝对/固定位置都不用怕 margin 重叠
table-cell/row 没有 margin，但 table，table-inline 和 table-caption 是有

## box 的 padding

在容器内控制元素 space/间隔/设置合适的 padding
容器内子元素想保持合适间隔，往往碰到容器和元素 margin，padding 重叠的问题
兄弟姐妹选择器+选择这 n 个相邻子内容（只选中后一个内容），设置 margintop 就行
通用间隔控制，猫头鹰选择器 _+_ 选中所有相邻元素，换句话说，选中所有不是首个子元素的其他页面元素，当然往往也是 body _+_，选中 body 内的猫头鹰选择
padding 和 margin 的值位置非常迷惑
四个数齐全时，分别是上右下左，顺时针
只有三个数时，分别是上 左右 下，中间一个数同时设置左右的值
只有两个数时，分别是上下 左右 各自设置两个对边
只有一个数，一把梭哈
经验总结
就是要全局整一个 border-box
避免显式设置元素的 height 来规避 overflow 问题
等高列或者垂直居中的效果用新的 css 布局实现
margin 怪的话就按上面的表查着改
考虑用全局猫头鹰选择器设置元素之间的间隔
