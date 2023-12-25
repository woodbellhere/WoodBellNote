所有属性其实都有默认值
浏览器自己指定一个 font-size，rem 参考这个值
所有相对值都会转换为 px
font-size 设置中的比例和 em 都会参考父元素 font-size
length/长度设置中的比例都会参考父元素的 width，em 则会参考当前的 font-szie

1 书写时指定的值
2 层叠 cascaded 值处理冲突 浏览器一般设置 16px 的 font-szie
3 特异/具体/设定值 如果没有设定的层叠值，使用默认值/这一步基本是继承高发区
4 计算值
将相对值转换为绝对值
5 使用 used 值 基于布局的最后计算结果
6 实际值 在浏览器限制下的使用值（比如有时候四舍五入）

相对值单位如何转换为绝对值单位

- 相对单位的参考对象是父元素
- rem 和 em 都是参考 font 大小的
- rem 参考根元素 font
- em 参考父或现元素 font
- vh 和 vw 基于浏览器视口

![valueResolve](docs/article/notes/public/valueResolve.png)
