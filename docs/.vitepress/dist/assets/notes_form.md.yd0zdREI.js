import{_ as e,o as a,c as t,R as l}from"./chunks/framework.OFllvWJp.js";const b=JSON.parse('{"title":"form 的基本要点","description":"","frontmatter":{},"headers":[],"relativePath":"notes/form.md","filePath":"notes/form.md"}'),o={name:"notes/form.md"},r=l('<h1 id="form-的基本要点" tabindex="-1">form 的基本要点 <a class="header-anchor" href="#form-的基本要点" aria-label="Permalink to &quot;form 的基本要点&quot;">​</a></h1><h2 id="表单中设置变量" tabindex="-1">表单中设置变量 <a class="header-anchor" href="#表单中设置变量" aria-label="Permalink to &quot;表单中设置变量&quot;">​</a></h2><p>表单里的 name 实际上到后台就是变量名 radio 的 name 用于设置单选题的范围，拥有同一 name 的 radio 自动互斥 checkbox 的 name 也能设置多选题范围，但就不互斥了</p><h2 id="select-的特点" tabindex="-1">select 的特点 <a class="header-anchor" href="#select-的特点" aria-label="Permalink to &quot;select 的特点&quot;">​</a></h2><p>一般下拉菜单使用 select，但如果想顺便加入手动输入的选项，可以用 input/txt 加 datalist 方案 select 里的 multiple 多选是考鼠标按住往下滑的 select 的选项分组通过 optgroup 实现，这个挺好，tag 上的 label 和一般的 label 不是一回事 选项不止有 select，还有 radio 和 checkbox</p><h2 id="label-的便利性" tabindex="-1">label 的便利性 <a class="header-anchor" href="#label-的便利性" aria-label="Permalink to &quot;label 的便利性&quot;">​</a></h2><p>label 将表单元素和相应的描述内容相联系，人读起来和屏幕阅读器读起来都舒服一点 同时也方便使用时选择/聚焦这些表单，点击 label 就会自动聚焦表单 label 有两种联系方式 一种隐式的，label 作为容器包住就行 一种显式，label 的 for 要和表单控制元素的 id 一致</p>',7),s=[r];function c(n,i,d,h,m,_){return a(),t("div",null,s)}const p=e(o,[["render",c]]);export{b as __pageData,p as default};