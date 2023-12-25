# css 中的值

## 常见的 px 系列

Px = 1/96 inch
Pt = 1/72 inch
Pc = 1/6 inch = 12pt = 16px
Inch = 25.4 mm = 2.54 cm = 6 pc = 72 pt = 96 px

## em 和 rem

em 是本 element 的 font-size 的值
而 rem 是 root em 的值，是根元素 font-size 的值
根节点的 em 是浏览器默认的 16px

rem 用来设置 font-size；em 用来设置 padding，margin，border-radius 等其他大部分属性
px 设置 border 是个挺保险的设置

## 值的继承

奇妙继承机制 元素的值使用由长度定义的值时，子元素就会继承其计算值。
而给 line-height 指定 en 时，值就会变为计算值

line-height 的设置直接不要单位

观察观察 css 变量和预处理工具

嵌套 list(ul 里套 li 再套 ul，循环)的字体大小向内逐级变为原来的 em 倍，所以要注意手动设置为 1em
