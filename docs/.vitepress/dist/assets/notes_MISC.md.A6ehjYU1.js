import{_ as a,o as e,c as t,R as s}from"./chunks/framework.TbLI3deC.js";const f=JSON.parse('{"title":"css 的杂项内容","description":"","frontmatter":{},"headers":[],"relativePath":"notes/MISC.md","filePath":"notes/MISC.md"}'),o={name:"notes/MISC.md"},r=s('<h1 id="css-的杂项内容" tabindex="-1">css 的杂项内容 <a class="header-anchor" href="#css-的杂项内容" aria-label="Permalink to &quot;css 的杂项内容&quot;">​</a></h1><h2 id="css-本身的编写风格" tabindex="-1">css 本身的编写风格 <a class="header-anchor" href="#css-本身的编写风格" aria-label="Permalink to &quot;css 本身的编写风格&quot;">​</a></h2><p>声明式 即在某某情况下，我们希望某某结果发生 比如一个 display:flex 的键值对 这种写法会在代码规模增长时变成屎山 css 多年来发展的一个趋势就是让行为更有可预测性</p><h2 id="对伪类伪元素的想法" tabindex="-1">对伪类伪元素的想法 <a class="header-anchor" href="#对伪类伪元素的想法" aria-label="Permalink to &quot;对伪类伪元素的想法&quot;">​</a></h2><p>伪类，nth-child。nth-of-type 都可以用来做（表格）交替配色</p><p>伪类和伪元素感觉上是让 css 也有操作 DOM 和响应事件的能力 child 类在后代选择中不好用，因为规则上实际限制了相同类型 link 类是说真的有对外连接的元素 link，visited，hover 和 active 四个伪类必须按顺序摆在其他 a 样式之前</p><h2 id="元素的宽高指定" tabindex="-1">元素的宽高指定 <a class="header-anchor" href="#元素的宽高指定" aria-label="Permalink to &quot;元素的宽高指定&quot;">​</a></h2><p>宽高只要手动指定一个，其他用 auto 就会自动使用 aspect/ratio 使用比例时，对照的宽高一般是父元素的宽高 • { Box-sizing:border-box; Padding:0; Margin:0 }基本上是标配</p><h2 id="真正的杂项" tabindex="-1">真正的杂项 <a class="header-anchor" href="#真正的杂项" aria-label="Permalink to &quot;真正的杂项&quot;">​</a></h2><p>列表子项默认 16px 选择器尽量不用 id，后续变更非常困难 rgb 的三色值相同时就是一种灰色，因此有 255 种不同的灰色</p>',10),i=[r];function c(n,d,h,l,_,p){return e(),t("div",null,i)}const m=a(o,[["render",c]]);export{f as __pageData,m as default};
