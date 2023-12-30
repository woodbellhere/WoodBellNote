import{_ as i,o as s,c as a,R as l}from"./chunks/framework.mPPLtEmG.js";const c=JSON.parse('{"title":"vue 中的生命周期","description":"","frontmatter":{},"headers":[],"relativePath":"vue/lifeCycle.md","filePath":"vue/lifeCycle.md"}'),t={name:"vue/lifeCycle.md"},n=l(`<h1 id="vue-中的生命周期" tabindex="-1">vue 中的生命周期 <a class="header-anchor" href="#vue-中的生命周期" aria-label="Permalink to &quot;vue 中的生命周期&quot;">​</a></h1><h2 id="选项式的生命周期" tabindex="-1">选项式的生命周期 <a class="header-anchor" href="#选项式的生命周期" aria-label="Permalink to &quot;选项式的生命周期&quot;">​</a></h2><p>beforeCreate()</p><ul><li>app.mount()创建 vue 实例之后，createApp()的配置项生效之前</li></ul><p>created()</p><ul><li>最早能够访问 this 的钩子</li><li>beforeCreate()之后， createApp()配置项生效之后</li><li>此时 data，computed， methods 和 watch 都配置好了</li></ul><p>beforeMount</p><ul><li>created 之后，应用还没有挂在指定的 html 元素上，也尚未在页面上渲染</li><li>要挂载的时候就调这个钩子了</li></ul><p>mounted()</p><ul><li>已经挂载 dom，可以进行修改访问</li><li>应用挂载到指定的 html 元素后执行</li><li>应用已经在页面上渲染出来了</li></ul><p>beforeUpdate()</p><ul><li>html 模板需要重新渲染时，比如 data 属性变化</li><li>此时会调这个钩子</li></ul><p>updated()</p><ul><li>数据更新后，html 重新渲染后调用</li></ul><p>beforeUnmount()</p><ul><li>应用卸载前执行，此时应用还可以正常活动</li></ul><p>unmounted()</p><ul><li>应用彻底卸载之后调</li><li>应用上的事件监听和指令绑定都卸载了</li></ul><h2 id="组合式的生命周期" tabindex="-1">组合式的生命周期 <a class="header-anchor" href="#组合式的生命周期" aria-label="Permalink to &quot;组合式的生命周期&quot;">​</a></h2><ul><li>onBeforeMount 创建之前,DOM 元素不存在</li><li>onMounted 创建时，DOM 已经存在</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 比如随意获取一个元素的DOM</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ref</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;wDom&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;{{ word }}&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> word</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ref</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;woodbell&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> wDom</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ref</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">HTMLDivElement</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;();</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 这个读出来undefined</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">onBeforeMount</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;创建之前&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, wDom.value);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 这个就读的到</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">onMounted</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;创建完成&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, wDom.value);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span></code></pre></div><ul><li>onBeforeUpdate 组件更新前,此时值还是之前的，此时可以做一些卸载操作</li><li>onUpdated 组件更新完成，值是之后的</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">button</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> @click=&quot;change&quot;&gt;顺着声明周期改改&lt;/button&gt;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> change</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> =</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> ()</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> =&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  word.value </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;改了试试&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 可以看到触发顺序也是正常的</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">onBeforeUpdate(()</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> =&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;更新组件前&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, wDom.value?.innerText);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">);</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">onUpdated(()</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> =&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;更新组件完成&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, wDom.value?.innerText);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">);</span></span></code></pre></div><ul><li>onBeforeUnmount 卸载前</li><li>onMounted 卸载完成</li></ul><h2 id="特定用途钩子" tabindex="-1">特定用途钩子 <a class="header-anchor" href="#特定用途钩子" aria-label="Permalink to &quot;特定用途钩子&quot;">​</a></h2><p>调试相关</p><ul><li><p>onRenderTrack</p></li><li><p>onRenderTrigger 都是用于调试的钩子</p></li><li><p>onErrorCaptured 捕获后代组件传递的错误时触发</p></li></ul><p>keepAlive 专用</p><ul><li>onActivated keepalive 组件被激活时</li><li>onDeactivated keepalive 组件被冷冻时</li></ul><p>SSR 相关</p><ul><li>onServerPrefetch 组件实例在服务器上被渲染前调用，ssr</li></ul>`,31),h=[n];function e(k,p,r,d,E,o){return s(),a("div",null,h)}const y=i(t,[["render",e]]);export{c as __pageData,y as default};