# get 和 post

## Get

- 幂等 不会改变服务器状态
- get 的请求没有请求体
- 明文发送 不太安全
- get 缓存 多次请求时有助于提高性能
- url 长度有限制，无法发送过大数据

## Post

- 非幂等 会改变服务器状态
- post 的请求有请求体
- 发请求体安全性高于 get 的明文发送
- 没缓存
- 数据大小没限制，请求 url 加参数超过 2048 字符时才应该使用 post
- 伟大的 ie 有相关限制
