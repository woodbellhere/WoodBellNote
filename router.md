前端路由

- 后端路由是一个实际存在的服务器地址，浏览器需要发请求来获取，要走一遍从 url 到页面
- 前端路由是组件/js 文件的别名，哈希或者 history api 用来告诉浏览器下一步在本机解析执行的 js 代码是哪些
- 如果有时候用户不幸刷新了页面，此时前端路由就会真正发送一次请求，也基本上都会 404，所以一般在 nginx 做工作
- 配一个 historyApiFallback，可以设置为 true，让错误请求时自动跳转回 index.html，也可以指定跳转到哪个

路由模式的作用之一是阻止请求

- hash 是锚点#， 是 window.location 的 href 属性
- 页面允许通过 location.hash 来改变 href 同时不刷新
- 兼容性好，但是#本身很奇怪

- history 模式是 api
- 通过一组栈风格的接口来控制页面 url， pathname 会正常变化
- 和正常 url 一致，路径有正常变化也不会请求资源

router-link 和 router-view

- 其实这俩肯定都是被 vue 自动注册为全局组件了

动态路由/参数路由

- 希望每个用户都有自己对应的页面时
- path:/user/:username
- 加上这个冒号做参数就行

router 实例和 meta

- 按照某种 vue 的管理，router 也应该在各个组件中获取到自己的实例，开发时能够利用这种实例做一些数据传递工作
- 上面这个每个用户都有自己的页面的需求，如果要展示用户名，就可以在模板中$route.params.username

404 路由

- 固定写法
- path: "/:pathMatch(.\*)",

子路由配置

- 由于 vue-router 自动配置，所以可以省去子路由上的父级路径
- /user/message 应该直接在 path 中配置为 message，连下划线都不该要

路由标签的 class 属性

- router 自动为标签添加了 active 之类的属性
- 由于复杂的父子路径关系，有需要时可以指定 exact-active-class 来指向特定路由

编程式导航

- 就是不同 router 自己给的标签和 api，而是用 history api 风格的 push 和 pop 以及 replace 这些
- 比如 定义任意方法然后 this.$router.push('/xxxx')
- 或者在 setup 风格下 useRouter 之后 router.push
- 这些 api 里都可以塞对象，对象里的 query 参数可以继续塞对象，然后变成普通的查询字符串

动态添加路由

- 根据权限不同给出不同页面

router 和 slot

- 之前的版本中可以通过 tag 属性<router-link tag="button">来指定路由标签的元素类型（比如我就想路由是个按钮）
- 现在 router-link 本身就变成某种插槽，你往里塞东西就行
- 属性中的 v-slot=“props”会通过作用域插槽给插槽中的内容提供很多信息
  - props.href 跳转链接
  - props.route 对象
  - props.navigate 导航函数
  - props.isActive 是否处于活跃状态
  - props.isExactActive 是否处于精确活跃状态

router-view 和 slot

- <component :is='props.Component'>和 router-view 的内部操作一致
- 你还可以在 slot 属性中的 props 中找到 component
- 然后在 router-view 中赛一个动态组件，把 props.component 传进去
- 再把这个动态组件包一层 transition，就可以 router-view 的动画效果了
- 组件切换动画
- 用 keep-alive 包裹就有组件缓存

按要求动态给出/生成路由内容

- 比如按照角色
- 或者选中菜单不同部分
- 主要就是 addRoute
- 在页面和路由文件中都要有所配置

```javascript
<template v-if="">
  <router-link to="/category">classification</router-link>
</template>;
// 路由文件中
const categoryRoute = {
  path: "/category",
  component: () => import("../pages/CategoryPage.vue"),
};

router.addRoute(categoryRoute);

// 还可以再加二级路由
children: [
  {
    path: "moment",
    component: () => import("../pages/HomeMoment.vue"),
  },
],
  router.addRoute("home", {
    path: "moment",
    component: () => import("../pages/HomeMoment.vue"),
  });
```

按要求删除路由

- 添加一个 name 相同的路由，相当于覆盖
- 直接 router.removeRoute
- addRoute 可以当作函数表达式，调用这个函数就可以取消(本身是个和 watcheffect 风格差不多的回调函数)

router 的其他方法

- hasRoute 检查路由存在
- getRoute 获取路由记录

登录路由的实践经验

- if（to.path.indexOf("/home") !== -1)这写法蛮好
- 除了 login 页，其它页自动跳转 login 页
- login 页中 setitemtoken 这些
- 登录逻辑还要加一个 if localstorage 的判断，如果已经在登录页正常过了，就可以随意使用路由

```javascript
// 路由文件
router.beforeEach((to) => {
  if (to.path !== "/login") {
    const token = window.localStorage.getItem("token");
    if (!token) {
      return "/login";
    }
  }
});
// 登录页文件
const router = useRouter();
const loginClick = () => {
  window.localStorage.setItem("token", "wood");
  router.push({
    path: "/home",
  });
};
```
