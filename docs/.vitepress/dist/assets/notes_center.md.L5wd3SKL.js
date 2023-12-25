import{_ as e,o as a,c as t,R as r}from"./chunks/framework.TbLI3deC.js";const u=JSON.parse('{"title":"喜闻乐见的居中","description":"","frontmatter":{},"headers":[],"relativePath":"notes/center.md","filePath":"notes/center.md"}'),n={name:"notes/center.md"},o=r(`<h1 id="喜闻乐见的居中" tabindex="-1">喜闻乐见的居中 <a class="header-anchor" href="#喜闻乐见的居中" aria-label="Permalink to &quot;喜闻乐见的居中&quot;">​</a></h1><h2 id="水平居中" tabindex="-1">水平居中： <a class="header-anchor" href="#水平居中" aria-label="Permalink to &quot;水平居中：&quot;">​</a></h2><pre><code>（页面居中要多加一个页面容器）
Margin 0 auto
Didplay flex justify-content：cneter
</code></pre><h2 id="文字居中" tabindex="-1">文字居中 <a class="header-anchor" href="#文字居中" aria-label="Permalink to &quot;文字居中&quot;">​</a></h2><pre><code>Text-align:center
Vertical:center
Line-height:xxx
</code></pre><h2 id="绝对定位" tabindex="-1">绝对定位 <a class="header-anchor" href="#绝对定位" aria-label="Permalink to &quot;绝对定位&quot;">​</a></h2><p>主要是 css 的定位都是从左上角点开始算的 所以 top 和 left50%会比视觉上居中差不少 而 translate 是按元素自己的宽高来的，正好挪回去抵消 Top: 50% Left: 50% Transform:traslate(-50%, -50%)</p>`,7),c=[o];function s(i,l,d,h,_,p){return a(),t("div",null,c)}const m=e(n,[["render",s]]);export{u as __pageData,m as default};
