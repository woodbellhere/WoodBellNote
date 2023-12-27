import{_ as s,o as i,c as a,R as l}from"./chunks/framework.OFllvWJp.js";const g=JSON.parse('{"title":"路由与 vue-router","description":"","frontmatter":{},"headers":[],"relativePath":"vue/router.md","filePath":"vue/router.md"}'),t={name:"vue/router.md"},n=l(`<h1 id="路由与-vue-router" tabindex="-1">路由与 vue-router <a class="header-anchor" href="#路由与-vue-router" aria-label="Permalink to &quot;路由与 vue-router&quot;">​</a></h1><h2 id="前端路由" tabindex="-1">前端路由 <a class="header-anchor" href="#前端路由" aria-label="Permalink to &quot;前端路由&quot;">​</a></h2><ul><li>后端路由是一个实际存在的服务器地址，浏览器需要发请求来获取，要走一遍从 url 到页面</li><li>前端路由是组件/js 文件的别名，哈希或者 history api 用来告诉浏览器下一步在本机解析执行的 js 代码是哪些</li><li>如果有时候用户不幸刷新了页面，此时前端路由就会真正发送一次请求，也基本上都会 404，所以一般在 nginx 做工作</li><li>配一个 historyApiFallback，可以设置为 true，让错误请求时自动跳转回 index.html，也可以指定跳转到哪个</li></ul><h2 id="路由模式的作用之一是阻止请求" tabindex="-1">路由模式的作用之一是阻止请求 <a class="header-anchor" href="#路由模式的作用之一是阻止请求" aria-label="Permalink to &quot;路由模式的作用之一是阻止请求&quot;">​</a></h2><ul><li><p>hash 是锚点#， 是 window.location 的 href 属性</p></li><li><p>页面允许通过 location.hash 来改变 href 同时不刷新</p></li><li><p>兼容性好，但是#本身很奇怪</p></li><li><p>history 模式是 api</p></li><li><p>通过一组栈风格的接口来控制页面 url， pathname 会正常变化</p></li><li><p>和正常 url 一致，路径有正常变化也不会请求资源</p></li></ul><h2 id="router-link-和-router-view" tabindex="-1">router-link 和 router-view <a class="header-anchor" href="#router-link-和-router-view" aria-label="Permalink to &quot;router-link 和 router-view&quot;">​</a></h2><ul><li>其实这俩肯定都是被 vue 自动注册为全局组件了</li></ul><h2 id="动态路由-参数路由" tabindex="-1">动态路由/参数路由 <a class="header-anchor" href="#动态路由-参数路由" aria-label="Permalink to &quot;动态路由/参数路由&quot;">​</a></h2><ul><li>希望每个用户都有自己对应的页面时</li><li>path:/user/:username</li><li>加上这个冒号做参数就行</li></ul><h2 id="router-实例和-meta" tabindex="-1">router 实例和 meta <a class="header-anchor" href="#router-实例和-meta" aria-label="Permalink to &quot;router 实例和 meta&quot;">​</a></h2><ul><li>按照某种 vue 的管理，router 也应该在各个组件中获取到自己的实例，开发时能够利用这种实例做一些数据传递工作</li><li>上面这个每个用户都有自己的页面的需求，如果要展示用户名，就可以在模板中$route.params.username</li></ul><h2 id="_404-路由" tabindex="-1">404 路由 <a class="header-anchor" href="#_404-路由" aria-label="Permalink to &quot;404 路由&quot;">​</a></h2><ul><li>固定写法</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">path</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/:pathMatch(.*)&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre></div><h2 id="子路由配置" tabindex="-1">子路由配置 <a class="header-anchor" href="#子路由配置" aria-label="Permalink to &quot;子路由配置&quot;">​</a></h2><ul><li>由于 vue-router 自动配置，所以可以省去子路由上的父级路径</li><li>/user/message 应该直接在 path 中配置为 message，连下划线都不该要</li></ul><h2 id="路由标签的-class-属性" tabindex="-1">路由标签的 class 属性 <a class="header-anchor" href="#路由标签的-class-属性" aria-label="Permalink to &quot;路由标签的 class 属性&quot;">​</a></h2><ul><li>router 自动为标签添加了 active 之类的属性</li><li>由于复杂的父子路径关系，有需要时可以指定 exact-active-class 来指向特定路由</li></ul><h2 id="编程式导航" tabindex="-1">编程式导航 <a class="header-anchor" href="#编程式导航" aria-label="Permalink to &quot;编程式导航&quot;">​</a></h2><ul><li>就是不同 router 自己给的标签和 api，而是用 history api 风格的 push 和 pop 以及 replace 这些</li><li>比如 定义任意方法然后 &#39;this.$router.push(&#39;/xxxx&#39;)&#39;</li><li>或者在 setup 风格下 useRouter 之后 router.push</li><li>这些 api 里都可以塞对象，对象里的 query 参数可以继续塞对象，然后变成普通的查询字符串</li></ul><h2 id="动态添加路由" tabindex="-1">动态添加路由 <a class="header-anchor" href="#动态添加路由" aria-label="Permalink to &quot;动态添加路由&quot;">​</a></h2><ul><li>根据权限不同给出不同页面</li></ul><h2 id="router-和-slot" tabindex="-1">router 和 slot <a class="header-anchor" href="#router-和-slot" aria-label="Permalink to &quot;router 和 slot&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//之前的版本中可以通过 tag 属性,来指定路由标签的元素类型（比如我就想路由是个按钮）</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">router-link</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> tag</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;button&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><ul><li>现在 router-link 本身就变成某种插槽，你往里塞东西就行</li><li>属性中的 v-slot=“props”会通过作用域插槽给插槽中的内容提供很多信息 <ul><li>props.href 跳转链接</li><li>props.route 对象</li><li>props.navigate 导航函数</li><li>props.isActive 是否处于活跃状态</li><li>props.isExactActive 是否处于精确活跃状态</li></ul></li></ul><h2 id="router-view-和-slot" tabindex="-1">router-view 和 slot <a class="header-anchor" href="#router-view-和-slot" aria-label="Permalink to &quot;router-view 和 slot&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">component</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> :is=&#39;props.Component&#39;/&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//和 router-view 的内部操作一致</span></span></code></pre></div><ul><li>你还可以在 slot 属性中的 props 中找到 component</li><li>然后在 router-view 中赛一个动态组件，把 props.component 传进去</li><li>再把这个动态组件包一层 transition，就可以 router-view 的动画效果了</li><li>组件切换动画</li><li>用 keep-alive 包裹就有组件缓存</li></ul><h2 id="按要求动态给出-生成路由内容" tabindex="-1">按要求动态给出/生成路由内容 <a class="header-anchor" href="#按要求动态给出-生成路由内容" aria-label="Permalink to &quot;按要求动态给出/生成路由内容&quot;">​</a></h2><ul><li>比如按照角色</li><li>或者选中菜单不同部分</li><li>主要就是 addRoute</li><li>在页面和路由文件中都要有所配置</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">template</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> v-if</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">router-link</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> to</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/category&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;classification&lt;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">router-link</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 路由文件中</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> categoryRoute</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  path: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/category&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  component</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;../pages/CategoryPage.vue&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">router.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">addRoute</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(categoryRoute);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 还可以再加二级路由</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">children</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    path: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;moment&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    component</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;../pages/HomeMoment.vue&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  router.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">addRoute</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;home&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    path: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;moment&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    component</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;../pages/HomeMoment.vue&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  });</span></span></code></pre></div><h2 id="按要求删除路由" tabindex="-1">按要求删除路由 <a class="header-anchor" href="#按要求删除路由" aria-label="Permalink to &quot;按要求删除路由&quot;">​</a></h2><ul><li>添加一个 name 相同的路由，相当于覆盖</li><li>直接 router.removeRoute</li><li>addRoute 可以当作函数表达式，调用这个函数就可以取消(本身是个和 watcheffect 风格差不多的回调函数)</li></ul><h2 id="router-的其他方法" tabindex="-1">router 的其他方法 <a class="header-anchor" href="#router-的其他方法" aria-label="Permalink to &quot;router 的其他方法&quot;">​</a></h2><ul><li>hasRoute 检查路由存在</li><li>getRoute 获取路由记录</li></ul><h2 id="登录路由的实践经验" tabindex="-1">登录路由的实践经验 <a class="header-anchor" href="#登录路由的实践经验" aria-label="Permalink to &quot;登录路由的实践经验&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 写法蛮聪明</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">（to.path.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">indexOf</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/home&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!==</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> -</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><ul><li>除了 login 页，其它页自动跳转 login 页</li><li>login 页中 setitem，token 这些</li><li>登录逻辑还要加一个 if localstorage 的判断，如果已经在登录页正常过了，就可以随意使用路由</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 路由文件</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">router.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">beforeEach</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">to</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (to.path </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!==</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;/login&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> token</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> window.localStorage.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getItem</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;token&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">token) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      return</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;/login&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 登录页文件</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> router</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> useRouter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> loginClick</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  window.localStorage.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">setItem</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;token&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;wood&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  router.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">push</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    path: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/home&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span></code></pre></div><h2 id="路由守卫的触发顺序" tabindex="-1">路由守卫的触发顺序 <a class="header-anchor" href="#路由守卫的触发顺序" aria-label="Permalink to &quot;路由守卫的触发顺序&quot;">​</a></h2><ul><li>导航被触发</li><li>失活组件中调用 beforeRouteLeave</li><li>调用全局 beforeEach</li><li>在重用组件中调用 beforeRouteUpdate（重用组件主要指动态 id 变化，其他没啥变化的组件）</li><li>路由配置中调用 beforeEnter</li><li>解析异步路由组件</li><li>在激活组件中调用 beforeRouteEnter</li><li>调用全局 beforeResolve</li><li>导航被确认</li><li>调用全局 afterEach</li><li>触发 DOM 更新</li><li>调用 beforeRouteEnter 中 next 部分的回调函数（长期来看可能就删了）</li></ul>`,41),h=[n];function e(p,k,r,o,E,d){return i(),a("div",null,h)}const c=s(t,[["render",e]]);export{g as __pageData,c as default};