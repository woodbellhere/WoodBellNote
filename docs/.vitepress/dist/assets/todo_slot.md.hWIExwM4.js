import{_ as l,o as t,c as i,R as o}from"./chunks/framework.mPPLtEmG.js";const x=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"todo/slot.md","filePath":"todo/slot.md"}'),s={name:"todo/slot.md"},p=o('<h2 id="slot" tabindex="-1">slot <a class="header-anchor" href="#slot" aria-label="Permalink to &quot;slot&quot;">​</a></h2><ul><li><p>slot</p></li><li><p>给子组件传递 html 模板内容，将自定义组件作为某种容器元素，动态更改其中的内容</p></li><li><p>由于 slot 会整体替换内容，所以想要具体指定哪部分的 slot 被哪部分 html 替换，就用 v-slot, 比较适合布局组件</p></li><li><p>v-slot=&#39;xxx&#39;可以在其他元素标签上指定整个 outerHtml 作为指定 slotxxx 中的内容</p></li><li><p>简写是 #</p></li><li><p>slot 中填充的数据仍然是在当前组件生效，不会自动带来 slot 组件的样式或者属性数据之类</p></li><li><p>所以还是在使用 slot 的组件中定义要求就行</p></li><li><p>有时候需要在 slot 标签中访问子组件的属性</p></li><li><p>在 slot 中 v-bind 自定义属性，并在使用 slot 的父组件中使用 v-slot 自定义一个属性（比如 prop）接收这个属性</p></li><li><p>然后父组件中的 slot 还是需要用 prop.xxx 来读取值</p></li><li><p>还可以尝试直接用解构语法拿出来 xxx,多个 slot 就不行了，必须要 template 模板来承接，同时需要指定具体的 v-slot 名字，不能省略</p></li><li><p>组件样式传递</p></li><li><p>也有一个$style 属性</p></li><li><p>照样可以 import 引入 css 文件完事</p></li><li><p>组件中的 style 实际上也是默认影响全局的</p></li><li><p>加了 style scoped 就好了</p></li><li><p>除此之外可以引入 css module 或者 sass 预编译</p></li><li><p>直接修改子组件或 slot 的样式应该怎样做？</p></li><li><p>直接修改子组件根元素则可以正常 css</p></li><li><p>选择子组件中根元素之外的元素，需要使用 deep 选择器</p></li><li><p>slot 自己也提供选择器 :slotted，但是由于预期不稳定，不好用</p></li><li><p>在样式中也绑定响应式数据</p></li><li><p>可以直接在 style 内写 v-bind，但是需要写 v-bind()函数形式，参数传计算属性也行</p></li></ul><p>slot</p><ul><li>不指定 slot 去向的话，默认是有几个 slot 就重复几遍传入内容</li><li>插槽默认名字是 default</li><li>具体指定 slot 承接内容的话，就需要用 template 包住传入内容，再给 template 加 v-slot 标签</li></ul><p>渲染作用域</p><ul><li>父级模板中的所有内容都在父级作用域中编译</li><li>子级模板的所有内容都在子级作用域中编译</li><li>如果确实希望插槽访问到子组件的内容，需要使用作用域插槽</li><li>有一套相当复杂的流程，v-slot 要指定 slotProps，记住 scoped slot 这一节</li></ul>',6),e=[p];function a(r,d,_,c,n,m){return t(),i("div",null,e)}const h=l(s,[["render",a]]);export{x as __pageData,h as default};