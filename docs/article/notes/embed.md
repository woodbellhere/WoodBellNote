# 嵌入网页的内容（好像是微前端的前身？）

## iframe

iframe 就是 inline frame，是另一个外部 html 文件/网页
地图 api 很多就是这么来的
有沙盒属性处理同源之类的安全问题
它本身有 sandbox 属性可以用，某种程度上规避安全问题
像什么 wujie，qiankun 就是这么来的

## object 和 embed

object 则是一种通用的外部资源 tag，和 embe 一样差不多是 flash 时代的前辈，基本都过时了
object 可以搞各种资源和花样
embed 只能放 plugin 插件
看文档更多是内网和企业项目用，本身就已经算 fallback 了

## video cnavas 等等

这些也算是嵌入网页其他资源的方式
