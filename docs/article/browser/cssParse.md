# css 解析的大致过程

## w3c 连图都没有，太垃了

但从文档来看，大致过程和 html 解析是基本一样的

## 粗线条的过程描述

- 也首先从网络或者本地接收文件
- 浏览器将这道 二进制字节流 按照特定的 字符编码方式解码为码点
  - 期间需要确定 fallback/保底编码方式
    - http 或者 html 的 http 头里指定就用
  - 实际解码然会返回，一般默认返回 utf-8，但是实际的编码情况挺多
- 预处理，也是类似的标准化
  - 也是把换行符都替换为 utf-lf
  - 以及把 utf-null 换成 utf- fffd
- 进入分词阶段
  - 这个过程似乎也跟 html 解析用状态即差不多
  - 将连续的字节流拆分为一系列独立 tokne，并将配对好的 tokne 返回字节流
- 进入 parsing/tree construction 阶段
  - 将 token 流解析为具体的 css 语法
    - 主要是区分不同类型的语法，比如一条 rule，一个声明等等
- 返回一个 cssStyleSheet 对象
