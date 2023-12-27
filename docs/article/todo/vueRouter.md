- vue 是一种单页应用
- 但你大可以把页面本身当组件
- 用页面 path 当动态组件的绑定对象，

- 手动维护这些路由容易出错
- vue router 就是一种声明式使用路由的方法

- 直接生成一个包含不同页面路径的对象

  ```javascript
  const routes = {
    "/": {
      component: PageOne,
      label: "页面1",
    },
    "/2": {
      component: PageTwo,
      label: "页面2",
    },
    "/3": {
      component: PageThree,
      label: "页面3",
    },
  };
  ```

- 实时监听“当前路径”在哪里

  ```javascript
  const currentPath = ref(location.pathname);
  const currentPage = computee => {
    routes[currentPath.value].component || PageOne;
    <!-- 设置默认页 -->
  });
  ```

- 将页面当作动态组件使用

  ```javascript
  <nav>
    <a :href="path" v-for="(route, path) in routes">
      {{ route.label }}
    </a>
  </nav>
  <component :is="currentPage"></component>
  ```

- 利用 history api 来处理页面跳转刷新

  ```javascript
  function changeRoute(path) {
    history.pushState(null, null, path);
    currentPath.value = location.pathname;
  }
  ```

- vue route 自己
- 单独定义一个 route.js 文件
- 路由现在放在一个对象数组里
- 引入 createRouter 来定义一个路由实例对象
- 引入 createWebHistory（也可以哈希）在实例对象中作为 history 配置项
- 在路由实例对象中引入路由数组
- 并在 main.js 入口文件 use 一下这个路由文件（express）狂喜
- router-view 根据路径数组来渲染当前路径下的组件

- 嵌套路由
- 就是在路由数组的对象中再加一个 children，它本身又是一个标准路由

- 路由管理中的动态路由
- 在路由对象的 path 部分也可以传 v-bind 的路径
- 此后可以通过 this.$route.params.postid 访问到

  ```javascript
  {
    path: "/:postId",
    component: BlogPostPage,
  }

  <article v-for="blogPost in blogPosts" :key="blogPost.id">
    <h2>
      <router-link :to="`/${blogPost.id}`">{{
        blogPost.title
      }}</router-link>
    </h2>
  ```

- 动态路由间的冲突
- 动态路由使用同一个组件实例展示（用 is 动态变化嘛），路径在动态路由之间跳转就相当于在同一个组件内反复横跳
- 因此只是复用组件实例，但是问题就是破坏生命周期正常活动，因为组件只在创建和销毁时执行一次，导致跳转应该有的重新创建操作失效
- 跟 key 的作用差不多
- 解决方法就是把生命周期操作换成 watch,这样路径变化就是必须要处理的正常操作
  ```javascript
  watch: {
    "$route.params": {
      handler(params, oldParams) {
        this.blogPost = getBlogPostById(params.postId);
      },
      immediate: true,
    },
  }
  ```
- 或者直接在生命周期钩子中使用 this.$route.params

  ```javascript
  created() {
    this.$watch(
      () => this.$route.params,
      function (params, oldParams) {
        this.blogPost = getBlogPostById(params.postId);
      },
      {immediate:true}
    );
  }
  ```

- 多个动态参数拼接时
- 比如说 /user/:userid/posts/:postid
- 查询每个用户所发的帖子
- 可以通过 this.$route.params 来获取
- 当有多个重复/数量不固定 url 时
- 如 goods/t-shirts/xshape 这种
- 就需要用+\*？这些看起来很正则的办法来实现(且只能用在动态路由中)

  - +至少出现一次
    - /:kind+ 就可以是 /kind 或者 /kind/t-shirts
  - \*出现任意次
    - /:kind\* 就可以是 /kind /kind/t-shirts 甚至 /
  - ? 出现 0-1 次
    - /:kind? /kind /kind/t-shirts /
  - /:notFound(.\*)/\* 统一的 404 路由

- 路由间的优先级
- 跟 css 选择器风格差不多，越精确的优先级越高
- 同级的前面的优先
- 有 path ranker 这种小工具可以看优先级

- 查询字符串形式
- 可以通过$route.query 获取
- ?后就是正式的 query 字段，基本按照 key=value 的形式组成，多个键值对按照 & 拼接

- 命名路由
- 可以在路由对象中多加 name 属性，可以避免有歧义的路由
- 在 router-link to 中可以按照对象形式传参，明确指定传哪个路由

- 路由别名
- 相同的 url 渲染相同的页面
- 比如 home 页和 index 页都指向/页
- 需要在路由对象中设置 alias 属性，按数组形式传参
- 需要注意，如果路径本身是动态参数，则别名中也需要加上这段动态参数

- 路由重定向
- 路由对象中设置 redirect 即可，也不需要设置 component
- 也可以在 redirect 中传一个命名路由的名字，则直接按命名重定向
- 动态路由需要用相当麻烦的办法

```javascript
{
    path: "/posts/:postId",
    redirect: (to) => {
      return {
        path: `/${to.params.postId}`,
      };
    },
  }
```

- 编程式导航
- 可以内联事件监听来跳转页面
  ```vue
  <button @click="$router.push(`/${blogPost.id}`)">查看全文</button>
  ```
- 传入的参数依然可以是比较完整的路由对象，而不只是一个拼接的字符串
- $router.push 是追加跳转
- $router.replace 则是更新最新的一条

- 命名视图 router-view - 路由中的 slot
- 根据设置的 name 属性展示不同的组件
- 也就是可以给一个 path 指定多个 命名的 components，在进入给定 path 时，router-view 和 component 按命名匹配渲染，剩下的属性就在无名的 router-view 中渲染

- 设置导航高亮样式
- 自定义 activeClass 的高亮样式会让所有父级路径一起高亮，这种只适合特定的路由分组情况
- 精确的 activeClass 高亮就需要设置 linkExactActiveClass 属性，并连接样式中的同名样式

- 导航守卫
- 拦截控制路由跳转
- 某种导航的生命周期钩子
- 全局配置，在 router 的全局实例中
- 按路由在路由对象中配置
- 在组件中配置，export default 中使用

- 全局导航
- beforeEach
  - 导航触发
  - 组件尚未加载
  - 导航尚未实际跳转前
  - 多为权限验证
- beforeResolve
  - 导航守卫执行完毕
  - 组件加载完毕
  - 组件中的导航守卫执行完毕
  - 导航实际跳转前
  - 数据加载或者特定权限操作
- afterEach

  - 导航确认
  - 导航实际跳转
  - 可以修改 DOM
  - 埋点，发送统计数据

- 路由导航
- beforeEnter

  - 进入对应路由（url 变化）
  - 页面未实际跳转
  - 动态路由的动态部分变化不会触发这个守卫
  - 对象中的 children 路由也受其控制

- router 中的组件中配置(一般组件不行)
- beforeRouteEnter()
  - 导航跳转时
  - 组件创建前
  - 不能访问组件 this,但可以通过 next 来访问
  - 只在第一次渲染时执行
- beforeRouteUpdate()
  - 导航跳转时
  - 复用组件时
  - 动态路由可以触发
  - 可以访问组件 this
  - 提醒用户是否真的要离开页面，表单可能要重填
- beforeRouteLeave()

  - 导航跳转时
  - 组件销毁前
  - 提醒用户保存

- 导航守卫执行顺序
- 如果组件中存在 beforeRouteLeave 守卫，则第一个执行
- 执行全局的 beforeEach 守卫
- 在复用组件中执行 beforeRouteUpdate 守卫
- 执行路由中的 beforeEnter 守卫
- 解析异步的守卫
- 执行组件中的 beforeRouteEnter 守卫
- 执行全局的 beforeResolve 守卫
- 确认导航并进行跳转
- 执行全局 afterEach 守卫
- 更新 DOM 节点
- 执行组件中 beforeRouteEnter 的 next 回调中的回调

- 权限守卫限定路径时要注意用 startWith，这样匹配所有相关路径，不会有漏网之鱼

  ```vue
  const loggedIn = false; router.beforeEach((to, from) => { //console.log(from);
  // console.log(to); if (to.path.startsWith("/blogs")) { if (!loggedIn) {
  return "/login"; } // return false; // return { // name: "login", // params:
  x, }; } });
  ```

- 生命周期钩子中的操作依然可以抽函数再以数组形式传给响应钩子

- 相当于一种缓慢呈现的效果
  ```vue
  beforeRouteUpdate(to) { this.blog = {}; setTimeout(() => { this.blog =
  getBlogPostById(to.params.postId); }, 1000); },
  ```
- 这个思路是获取响应动态路由然后挂载到组件实例 vm 上

- meta 元数据
- 也是配在路由对象里,查看需要在 to，from 的 match 里的 meta 看
- matched 实际上是所有 meta 数据的集合
- 子对象 meta 不会递归合并，同名 meta 则后覆盖前
- 存各种自定义数据
- 权限验证就可以用这个来

- 控制滚动条
- 每次重新进入路由时都从把位置重置到页面开头
- router 对象中有 scrollBehavior
- 这个 scrollBehavior 是一个对象，内容和 position 有点像，你想把页面停在哪就停在哪
- 还他妈支持延时滚动，将 scrollBehavior 写成函数，return 一个 promise 完事

  ```vue
  const router = createRouter({ history: createWebHistory(), routes,
  scrollBehavior(to, from, savedPosition) { return new Promise((resolve) =>
  setTimeout(() => { resolve({ top: 200, behavior: "smooth", }); }, 1000) ); },
  });
  ```

- 还可以设置 el 元素，针对具体 dom 元素偏移
- 还可以选择 savedPosition 参数，在前进和回退时保存页面位置数据

- 路由懒加载 异步组件
- 在组件展示时再加载
- 基本上就是用 const 组件名 = () => import('组件路径') 方式包裹一层再用

- 在 router 中给组件传递参数
- 在路由对象中设置 props 为 true
- 在相应组件页面继续承接 prop

- 自定义/扩展 router-link
- $props 是组件实例的 prop 属性，经常可以用来指定一批变量

- 处理导航错误
- 错误主要有三种
- aborted 导航被终端，或许是守卫终止了路由跳转
- cancelled 导航取消，导航跳转中有新的路由跳转，例如用户连续点击多次链接
- duplicated 重复导航，当前页面已经是跳转目标路由

- aborted
- 在子组件定义一个重定向函数，存储并打印失败信息

  ```javascript
  async redirectToManagementPage() {
      const failure = await this.$router.push("/blogs");
      console.log(failure);
      console.log(isNavigationFailure(failure));
    }
  ```

- isNavigationFailure 函数可以判断是否为标准的导航错误
- 也有 navigationFailure.type 做具体判断

- 在路由文件正常搞一个生命周期钩子做登录控制就行

- 如何动态添加路由
- 直接在组件实例中调 api
- this.$route.addRoute({path, name, component})
- this.$route.removeRoute('name')
- 或者 const removeRoute = this.$router.addRoute(); removeRoute()

- 路由过渡动画
- 用 router-view 包裹 transition，transition 再包裹动态组件

- composition api 使用路由
- 依然变为 useRoute 函数,使用 const router = userRoute()来构建对象
- 相关的数据通过 useRoute().params.postId
- 能转换的生命周期钩子都加了 on
- 有些因为在 setup 之前执行，所以仍然需要选项 api
