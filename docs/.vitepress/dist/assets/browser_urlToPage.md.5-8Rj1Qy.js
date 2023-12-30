import{_ as l,o as i,c as a,R as e}from"./chunks/framework.mPPLtEmG.js";const t="/WoodBellNote/assets/processInUrlToPage.bt7-vWmn.webp",o="/WoodBellNote/assets/gpuRasterwebp.pToBwNaE.webp",r="/WoodBellNote/assets/fullRender.zlayhtUx.webp",u="/WoodBellNote/assets/reflow.BbIFvsm3.webp",s="/WoodBellNote/assets/repaint.laaT5pVz.webp",p="/WoodBellNote/assets/composition.Rr4XTXN3.webp",g=JSON.parse('{"title":"从 url 到页面","description":"","frontmatter":{},"headers":[],"relativePath":"browser/urlToPage.md","filePath":"browser/urlToPage.md"}'),c={name:"browser/urlToPage.md"},n=e('<h1 id="从-url-到页面" tabindex="-1">从 url 到页面 <a class="header-anchor" href="#从-url-到页面" aria-label="Permalink to &quot;从 url 到页面&quot;">​</a></h1><h2 id="基本流程" tabindex="-1">基本流程 <a class="header-anchor" href="#基本流程" aria-label="Permalink to &quot;基本流程&quot;">​</a></h2><p><img src="'+t+'" alt="一个进程级别的展示"></p><h3 id="客户端" tabindex="-1">客户端 <a class="header-anchor" href="#客户端" aria-label="Permalink to &quot;客户端&quot;">​</a></h3><ul><li>构建请求 <ul><li>浏览器进程基于 url 构建请求行信息，并转发给网络进程</li><li>有一个 url 解析的过程 <ul><li>直接输入 url 就会拼接上协议部分发送</li><li>输入内容就会使用搜索引擎，然后合成为 url</li></ul></li><li>这时候还是 beforeunload 事件，还没有真正离开/更新页面</li></ul></li><li>进程间通过 ipc 将请求发送到网络进程 <ul><li>查找缓存，相当于整个请求过程中第一个拦截器</li><li>请求 DNS 查找 ip 地址和端口 <ul><li>http 请求需要 tcp 连接作为环境</li><li>tcp 连接需要 ip 地址和端口号</li><li>ip 需要通过 url 向 DNS 查询</li><li>DNS 本身也有缓存</li></ul></li><li>如果是 https，则还要 tls</li><li>首先等待 tcp 队列清空 <ul><li>chrome 中，同一个域名最多只能建立 6 个 tcp 连接，多的得等</li><li>早些年的域名分片技术就是这么来的</li></ul></li><li>然后才开始建立 tcp 连接 <ul><li>三次握手这些</li></ul></li><li>实际构建 http 报文，发送 http 请求</li></ul></li></ul><h3 id="服务端" tabindex="-1">服务端 <a class="header-anchor" href="#服务端" aria-label="Permalink to &quot;服务端&quot;">​</a></h3><ul><li>服务器返回请求</li><li>断开 tcp 连接或者保持长连接状态</li></ul><h3 id="再到客户端" tabindex="-1">再到客户端 <a class="header-anchor" href="#再到客户端" aria-label="Permalink to &quot;再到客户端&quot;">​</a></h3><p>请求收发阶段</p><ul><li>网络进程获取响应数据，解析取出后交给浏览器进程 <ul><li>观察是否有重定向，有就重新来一遍请求</li><li>观察响应数据格式 <ul><li>如果是 stream 一类的下载类型，则内容交给浏览器的下载管理其</li><li>如果是普通 html，则浏览器继续导航流程，通知渲染进程准备开工</li></ul></li></ul></li></ul><p>准备渲染阶段</p><ul><li>浏览器进程检查新页面与现页面是否根域名相同 <ul><li>相同则复用渲染进程</li><li>不同则开启新的渲染进程</li></ul></li></ul><p>提交文档/开始更新</p><ul><li>浏览器进程向渲染进程发送“提交导航 commitNavigation”消息</li><li>渲染进程收到消息后，与网络进程建立数据管道开始接收数据</li><li>渲染进程接收数据完毕就会向浏览器进程“确认提交”</li><li>浏览器进程收到确认提交后就移除旧文档，更新本进程中的页面状态 <ul><li>地址栏 url</li><li>历史状态</li><li>更新页面</li></ul></li></ul><p>渲染阶段</p><ul><li>由于网络请求依然正常收发 style 和 script 内容，所以这个过程中间可能会被嵌入不同的过程 <ul><li>老题 js 阻塞解析</li></ul></li><li>构建 DOM 树 <ul><li>浏览器通过 dom 理解 html</li></ul></li><li>样式计算，依然需要 css 样式表 <ul><li>浏览器通过 styleSheets 理解 css</li><li>将所有属性值标准化</li><li>计算 dom 每个节点的样式 <ul><li>适用继承和层叠规则</li></ul></li></ul></li><li>布局 <ul><li>通过 dom 和 dom 中的元素样式结算 dom 中可见元素的几何位置</li><li>构建布局树，只包含 dom 中的可见元素，head 里的都丢掉，display：none 的都丢掉</li><li>动态计算并返回布局结果给布局树（我算我自己）</li></ul></li><li>分层 <ul><li>页面是有具体的不同图层的，是叠在一起的</li><li>渲染引擎为特定节点生成专用图层，最后构建图层树</li><li>布局树通过一些规则生成图层树 <ul><li>有层叠上下文属性，比如 z-index，position，透明和滤镜</li><li>需要裁剪 clip 的地方创建为图层</li></ul></li></ul></li><li>绘制(列表) <ul><li>对每个图层进行绘制</li><li>渲染引擎将图层绘制分解为具体的绘制指令，并按顺序整合为一个待绘制列表</li><li>绘制列表只是一个记录性质的文件，操作是由渲染引擎的合成线程完成的</li></ul></li><li>分块 <ul><li>主线程将绘制列表提交给合成线程</li><li>合成线程将图层划分为不同的图块 tile（一般是 256<em>256 或者 512</em>512）</li><li>视口附近的图块会优先生成位图 bitmap</li><li>而生成位图 bitmap 的操作是栅格化来执行的</li></ul></li><li>光栅化 <ul><li>光栅化/栅格化就是图块转换为位图的过程</li><li>图块是光栅化/栅格化的最小单位</li><li>渲染进程维护了一个栅格化的线程池，负责所有的图块栅格化</li><li>GPU 进程可能加入栅格化的加速，生成的位图会保存再 GPU 内存中</li><li>而如果栅格化确实使用 GPU，则最后整个流程就切换到 GPU 进程中完成</li><li><img src="'+o+'" alt="GPU参数的栅格化"></li></ul></li><li>合成 <ul><li>在所有图块的光栅化完成之后，合成线程就生成绘制图块的命令 DrawQuad，并提交给浏览器进程</li><li>浏览器进程的 viz 组件会接收 DrawQuad 命令，并将页面内容绘制到内存中，最后将内存显示在屏幕上</li><li><img src="'+r+'" alt="全流程"></li></ul></li></ul><h2 id="特定步骤解释" tabindex="-1">特定步骤解释 <a class="header-anchor" href="#特定步骤解释" aria-label="Permalink to &quot;特定步骤解释&quot;">​</a></h2><ul><li>ip 把数据包送到目的主机</li><li>tcp/udp 把数据包安全完整/送到目的应用程序</li></ul><h2 id="重排重绘合成与页面性能" tabindex="-1">重排重绘合成与页面性能 <a class="header-anchor" href="#重排重绘合成与页面性能" aria-label="Permalink to &quot;重排重绘合成与页面性能&quot;">​</a></h2><p>重排 reflow 重新布局</p><ul><li>更新元素的集合属性</li><li>即通过 js 或 css 修改元素的几何位置属性，如宽度、高度，就会触发重排</li><li>重排会触发布局以及之后的一系列操作，性能压力最大</li><li><img src="'+u+'" alt="重排"></li></ul><p>重绘 repaint</p><ul><li>修改元素的颜色等纯粹的样式，只会触发绘制（列表）之后的操作</li><li>相比重排省掉浪费布局和分层</li><li><img src="'+s+'" alt="重绘"></li></ul><p>合成</p><ul><li>transform 属性做的一些样式变化就只触发最后的合成操作，性能压力最小</li><li><img src="'+p+'" alt="合成"></li></ul>',25),d=[n];function h(m,_,b,P,f,w){return i(),a("div",null,d)}const q=l(c,[["render",h]]);export{g as __pageData,q as default};