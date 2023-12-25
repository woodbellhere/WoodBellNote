# 喜闻乐见的居中

## 水平居中：

    （页面居中要多加一个页面容器）
    Margin 0 auto
    Didplay flex justify-content：cneter

## 文字居中

    Text-align:center
    Vertical:center
    Line-height:xxx

## 绝对定位

主要是 css 的定位都是从左上角点开始算的
所以 top 和 left50%会比视觉上居中差不少
而 translate 是按元素自己的宽高来的，正好挪回去抵消
Top: 50%
Left: 50%
Transform:traslate(-50%, -50%)
