# form 的基本要点

## 表单中设置变量

表单里的 name 实际上到后台就是变量名
radio 的 name 用于设置单选题的范围，拥有同一 name 的 radio 自动互斥
checkbox 的 name 也能设置多选题范围，但就不互斥了

## select 的特点

一般下拉菜单使用 select，但如果想顺便加入手动输入的选项，可以用 input/txt 加 datalist 方案
select 里的 multiple 多选是考鼠标按住往下滑的
select 的选项分组通过 optgroup 实现，这个挺好，tag 上的 label 和一般的 label 不是一回事
选项不止有 select，还有 radio 和 checkbox

## label 的便利性

label 将表单元素和相应的描述内容相联系，人读起来和屏幕阅读器读起来都舒服一点
同时也方便使用时选择/聚焦这些表单，点击 label 就会自动聚焦表单
label 有两种联系方式
一种隐式的，label 作为容器包住就行
一种显式，label 的 for 要和表单控制元素的 id 一致
