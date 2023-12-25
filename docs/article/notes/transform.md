# transform 的基本内容

## 适用范围

Transform 对原子（纯）inline 元素，比如 span，不管用（再看看文档）

transform 执行顺序是有关的
多个执行顺序会覆盖，效果不是累加的
利用伪类可以 hack 累加效果

annimated 的效果则是累加的

## Translate

参数有具体数值和比例两种，比例以元素自己的 size 为参照
translatez 没有比例
translate 最通用，想指定啥就是啥
translate3d 是一次性移动三个方向的语法糖，必须要三个参数

## Scale

参数是作为缩放倍数的正实数
scale 通用缩放
scalez 在有旋转的情况下有用

## Rotate

参数为角度
同样注意 animated，指定大于 360° 的旋转会让动画转几圈
rotate3d 围绕一个指定的三维向量轴旋转，参数照此安排

## Skew

扭曲元素角度,抓住元素的角，然后按照特定角度拉扯它
skew 接受 x，y 两个角度，运行似乎是所谓的[ax,ay]
按 tan（x/y）来确定扭曲的基向量

## Perspective

给予深度的视觉效果
最好写在 transform 的最前面
（现在用 perspective 属性多过函数）

## Matrix

参数一共六个值，思路是一个三维的齐次矩阵，六个值两两是第一，二和四列的值
matrix3d 一共十六个参数，也是一个三维的齐次矩阵，十六个值四四为一列
![Transform Matrix](docs/article/notes/public/transformMatrix.png)
