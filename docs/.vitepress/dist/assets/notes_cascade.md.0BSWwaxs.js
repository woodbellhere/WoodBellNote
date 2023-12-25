import{_ as t,o as e,c as a,R as n}from"./chunks/framework.TbLI3deC.js";const r="/WoodBellNote/assets/originOrder.-3EGBdOt.png",m=JSON.parse('{"title":"层叠与权重","description":"","frontmatter":{},"headers":[],"relativePath":"notes/cascade.md","filePath":"notes/cascade.md"}'),i={name:"notes/cascade.md"},o=n('<h1 id="层叠与权重" tabindex="-1">层叠与权重 <a class="header-anchor" href="#层叠与权重" aria-label="Permalink to &quot;层叠与权重&quot;">​</a></h1><h2 id="权重规则按处理顺序依次为" tabindex="-1">权重规则按处理顺序依次为 <a class="header-anchor" href="#权重规则按处理顺序依次为" aria-label="Permalink to &quot;权重规则按处理顺序依次为&quot;">​</a></h2><p>样式来源提供的权重 specificity 计算规则提供的权重 代码顺序提供的权重 DOM 树继承的 style <img src="'+r+`" alt="Origin Order"></p><h2 id="样式来源提供的权重" tabindex="-1">样式来源提供的权重 <a class="header-anchor" href="#样式来源提供的权重" aria-label="Permalink to &quot;样式来源提供的权重&quot;">​</a></h2><pre><code>是指浏览器自己也会设置一些默认样式，比如说heading类都&quot;自动&quot;加粗黑体，然后上下margin吧？list都“自动”加左部原点和padding吧？
	浏览器自己加的一般叫user-agent style
	我们写的叫author style
	有些浏览器还设置user style，优先级最高
来源样式可以看f12自带结果，随便一动也就改了
我感觉来源样式基本也遵循代码先后规则，没有规定新的优先规则
</code></pre><p>!important 的优先级还是最高</p><h2 id="specificity-计算规则提供的权重" tabindex="-1">specificity 计算规则提供的权重 <a class="header-anchor" href="#specificity-计算规则提供的权重" aria-label="Permalink to &quot;specificity 计算规则提供的权重&quot;">​</a></h2><pre><code>规则集里每一条规则都算数
内联style属性最高

不同级别的选择器相互组合之后又有不同的specificity，ID,CLASS和Tag三类specificity可以抽象为一个计算用的向量，每个种类的分值可叠加（四个数的向量是用来纳入行内style的）
	!important（被规则置为最高）&gt;&gt;&gt;
	行内样式&gt;
	ID&gt;
	类，属性和伪类&gt;
	元素和伪元素 &gt;&gt;&gt;
	*（全局选择器被规则置为低于上述）&gt;&gt;&gt;
	继承（被规则置于最低）

	复杂选择器先在内部相加
	高级别权重完全覆盖低级别权重
	级别相同时，总体来说组合越复杂的选择权重越高
	只有ID,Class和Tag有权重数值
	选择器的组合符号不影响级别
</code></pre><p>所以手动改选择器权重的时候就想俩，一个升级就搞复杂一点，降级就搞简单一点</p><h2 id="代码顺序提供的权重" tabindex="-1">代码顺序提供的权重 <a class="header-anchor" href="#代码顺序提供的权重" aria-label="Permalink to &quot;代码顺序提供的权重&quot;">​</a></h2><h2 id="dom-树继承的-style" tabindex="-1">DOM 树继承的 style <a class="header-anchor" href="#dom-树继承的-style" aria-label="Permalink to &quot;DOM 树继承的 style&quot;">​</a></h2><pre><code>沿DOM树继承
主要是color，font族，text族，list族，word，space，letter等主要是行内属性，border-collapse和sapcing也能继承
设置inherit可以手动盖过正常的优先级计算而继承父元素属性（但优先级相当低），也可以用于强制继承不默认继承的属性
</code></pre><p>设置 initial 可以手动恢复元素的默认值（基本都有），取消最后计算出来的属性值</p><h2 id="权重规则经验总结" tabindex="-1">权重规则经验总结 <a class="header-anchor" href="#权重规则经验总结" aria-label="Permalink to &quot;权重规则经验总结&quot;">​</a></h2><pre><code>样式来源权重 &gt; specifity &gt; 代码先后顺序
少用ID，少用! Important
简写属性可能会覆盖其他属性，要慎重，尤其是font
粒度越小的权重越高，且大于关系是绝对的，n个元素选择也比不上一个类选择
同权重属性则后出现的权重更高
元素嵌套后样式自动继承，优先级按由近到远实现
</code></pre><p>继承的唯一例外，background 的颜色可能覆盖 html（当未指定时）</p>`,16),s=[o];function c(l,d,p,h,_,g){return e(),a("div",null,s)}const u=t(i,[["render",c]]);export{m as __pageData,u as default};
