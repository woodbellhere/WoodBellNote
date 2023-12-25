# grid 的流水账

## 直接确定整个网格容器的高度

grid-line 就是分割布局的网格线，每根线都有自己的编号
grid-cell 网格布局中的网格
gutters（gaps）网格子项之间的间隔，分行列
grid-tracks 基本就是一整行或者一整列

## 网格容器

grid-template-column
Grid-template-row
Row-gap
Column-gap
Justify-content
Align-items
Align-content 在网格布局里是 jsutify-content 的列翻版，用这俩就行
align-items 是在单个网格内部进行对齐

## 网格子项

gird-column 把子项定位到特定网格
grid-row 把子项定位到特定网格
justify-self 覆盖 justify 的行规则
align-self 覆盖 align 的列规则

## 网格值

fr 跟 flex 那一系列的比例值差不多
都是根据富余空间算比例
