# position 的简单了解

# static

默认是符合文档流的 static

# static 和 relative

用 position 定位基本就默认要一个 relative 的容器了
relative 用 static 的定位做偏移

# absolute

absolute 概括来说就是会跳出文档流，基于非 static 的元素做偏移
不会对周边元素造成影响，但可能会覆盖它们（也是失去正常互动的一种）
手动设置上下左右来指定相对“在正常文档流中”的位置，其参照的父级元素是最近一个非 static 定位的父级元素
比如常见的页面边角的按钮或者什么信息
边角信息本身一个 absolute 容器指定位置
包裹边角信息的容器需要是 relative，来让边角信息按照 absolute 定位

# fixed

fixed 则基于视口的位置做偏移，跳出文档流

# sticky

一般按照正常文档流做定位
当元素挪出视口时，基本上按照 fixed 做定位
文档上是创建新的层叠上下文然定位后在滚动父元素上，想象一下 stick 导航栏
