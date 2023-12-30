import{_ as i,o as s,c as a,R as l}from"./chunks/framework.mPPLtEmG.js";const y=JSON.parse('{"title":"组件间的数据传递","description":"","frontmatter":{},"headers":[],"relativePath":"vue/propsTransfer.md","filePath":"vue/propsTransfer.md"}'),t={name:"vue/propsTransfer.md"},n=l(`<h1 id="组件间的数据传递" tabindex="-1">组件间的数据传递 <a class="header-anchor" href="#组件间的数据传递" aria-label="Permalink to &quot;组件间的数据传递&quot;">​</a></h1><h2 id="父子组件-props-和-emit" tabindex="-1">父子组件 props 和 emit <a class="header-anchor" href="#父子组件-props-和-emit" aria-label="Permalink to &quot;父子组件 props 和 emit&quot;">​</a></h2><ul><li>在父组件中通过元素属性标签即可传 prop</li><li>子组件中可以通过 defineProps 明确接受参数（组合式 api）</li><li>接受的 props 在模板中可用，在代码中可用需要变量接受上面的 defineProps</li><li>ts 中可以用 withDefault 来专门设置默认值</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 父组件中向子组件这样传值</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">waterFall</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> :title=&quot;name&quot;</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> :arr=&quot;[1,</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> 2,</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> 3,</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> 4,</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> 5,</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> 6]&quot;&gt;&lt;/waterFall&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 子组件中这样接受props</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> props</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> =</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> defineProps({</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">  title:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    type: String,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    default: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;默认&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">,</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">});</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 然后就可以使用</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">&lt;div&gt;{{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> title</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> }}&lt;/div&gt;</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">&lt;div&gt;{{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> arr</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> }}&lt;/div&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 这是ts加泛型后的写法</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> props</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> =</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> defineProps&lt;{</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> title:</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> string;</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> arr:</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> number[]</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> }&gt;();</span></span></code></pre></div><ul><li>子组件向父组件传值</li><li>需要首先指定传递的内容 defineEmit</li><li>然后设置事件触发 emit 来上传 defineEmit 中的内容</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// emit被设计为需要触发的事件</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">button</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> @click=&quot;send&quot;&gt;&lt;/button&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 自定义一个让父组件监听的触发事件on-click</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> emit</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> =</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> defineEmits([&quot;on-click&quot;]);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> send</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> =</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> ()</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> =&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 定义需要自定义触发事件中传递的具体数据</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  emit</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;on-click&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;param1&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;param2&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;paramN&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 父组件直接监听子组件自定义的触发事件</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">&lt;waterFall</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> @on-click=&quot;getName&quot;&gt;</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">&lt;/waterFall&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 然后就可以通过参数接收上传数据</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> getName</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> =</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> (name:</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> string)</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> =&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(name, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;从子组件来的&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">;</span></span></code></pre></div><ul><li>子组件向父组件暴露方法或者属性</li><li>defineExpose 传出，然后父组件中用 ref 从 dom 里拿</li></ul><h3 id="单向数据流规范" tabindex="-1">单向数据流规范 <a class="header-anchor" href="#单向数据流规范" aria-label="Permalink to &quot;单向数据流规范&quot;">​</a></h3><p>prop 基本是挂在元素上的 data 属性，用处就像 vue 文档里的 blog</p><ul><li>prop 对于子组件来说是只读的</li><li>数据只从父组件往下传，子组件自己不要乱改</li><li>如果要改，要么明确通知父组件让它改，要么子组件给个占位数据，承接 prop 为本地数据再改</li><li>显然也是可以动态绑定的</li><li>如果想直接传整个对象，不用手动一个一个绑定属性，就要求组件属性和对象属性一样，这样 vue 就能自动解析</li></ul><h3 id="prop-的配置项" tabindex="-1">prop 的配置项 <a class="header-anchor" href="#prop-的配置项" aria-label="Permalink to &quot;prop 的配置项&quot;">​</a></h3><ul><li><p>type ，可以传数组接受多个类型</p></li><li><p>required，可以确认是否必须</p></li><li><p>default，设置默认值</p><ul><li>指定 type 为 object 或函数时，default 要按照工厂函数形式书写 default(){return {key:value}}</li></ul></li><li><p>validator:自定义校验函数</p></li><li><p>非 prop 的属性，比如 class，style 和 id 等有不同的处理条件</p><ul><li>组件有单个根节点时，上述属性自动添加到根节点中,inheritAttrs 就是管这个的，阻止访问可以设置 inheritAttrs 为 false</li><li>一般在想让非根节点使用这些 class 才有用，在子组件中可以通过$attrs.xxx 来获取这些属性</li><li>当然也可以 v-bind=$attrs 一次绑定</li><li>默认将属性传递到 template 上最外层的元素，（经常是个 div），所以你在使用组件的地方写样式的时候也要想好</li><li>手动访问可以用$attrs 在被传入的组件中观察 prop</li></ul></li><li><p>同时响应式又让更新的父组件数据实时传给子组件，奇妙双向数据流？</p></li></ul><h3 id="emit-方法" tabindex="-1">emit 方法 <a class="header-anchor" href="#emit-方法" aria-label="Permalink to &quot;emit 方法&quot;">​</a></h3><ul><li>子组件向父组件发事件来传间接传数据 emit</li><li>事件可以传参数，参数能被父组件接收到</li><li>有 emit 属性和 prop 属性风格一样，直接指定要上传的事件，然后再具体指定事件的内容</li><li>$emit()就是通知父组件的方法,头一个参数是命名，后面 n 个参数都是数据，此时父组件某种程度上也需要一个占位数据/方法</li><li>如果内联传无所谓，在 method 方法里传就要记得要指定 this，不然传不对数据</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> handleClick</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">     this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$emit</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;deletePost&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.id);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   },</span></span></code></pre></div><ul><li>父组件可以直接@监听子组件定义的事件</li><li>父组件属性变化时子组件自动刷新</li><li>组件接受的 prop 本身也是动态属性时,组件接受的 prop 跟着变，页面跟着渲染，放心放心</li></ul><h2 id="前代后代组件传递-provide-和-inject" tabindex="-1">前代后代组件传递 provide 和 inject <a class="header-anchor" href="#前代后代组件传递-provide-和-inject" aria-label="Permalink to &quot;前代后代组件传递 provide 和 inject&quot;">​</a></h2><ul><li><p>多层-级级 prop 传递</p></li><li><p>不安全，不可靠，不能保证每一层的 template 都是根组件，也不能保证 inheritAttr 畅通无阻</p></li><li><p>provide 向所有后代组件提供 prop，inject 接受 prop</p></li><li><p>用 provide 提供 data 属性时要变 data() return 这种，不能直接传数组或者对象</p></li><li><p>provide 中的属性不是响应式的，不会同步更新 provide</p></li><li><p>要按函数形式使用，才能正确绑定 publicThis</p></li><li><p>provide 如果希望使用 data 中的变动数据（比如 data 中某个数组的长度），就需要使用 computed 函数</p></li></ul><h2 id="兄弟组件" tabindex="-1">兄弟组件 <a class="header-anchor" href="#兄弟组件" aria-label="Permalink to &quot;兄弟组件&quot;">​</a></h2><ul><li>vuex 和 pinia</li></ul><h2 id="组件-v-model" tabindex="-1">组件 v-model <a class="header-anchor" href="#组件-v-model" aria-label="Permalink to &quot;组件 v-model&quot;">​</a></h2><ul><li><p>在组件上实现 v-model/封装表单输入控件为组件</p></li><li><p>一般情况下可以通过 v-model 让数据实时呈现在页面其他地方</p></li><li><p>但比如说引入的子组件是一个输入表单的时候，组件之间就不能默认 v-model 可行</p></li><li><p>接收固定名为 modelValue 的属性，并触发固定名为 update 的事件</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:value</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;modelValue&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">@input</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;$emit(&#39;update:modelValue&#39;, $event.target.value)&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">prop</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:[</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;modelValue&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">emits</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:[</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;update:modelValue&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span></code></pre></div></li><li><p>这种方式只能支持一个 v-model</p></li><li><p>遇到选择情境时，可能需要多个 v-model，此时需要给 v-model 加入参数</p></li><li><p>也就是</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;!--</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 父组件指定v</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">model </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">--&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">xxx</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">      v-model</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">searchTerm</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;searchTerm&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">      v-model</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">category</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;category&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    /&gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;!--</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 子组件v</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">model的设置 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">--&gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;!--</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 配置项 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">--&gt;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">props</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;xxx1&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;xxx2&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">emits</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;update:xxx1&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;update:xxx2&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;!--</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 模板中的指令设置 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">--&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">xxx</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:value=&quot;xxx1&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">@input=&quot;$emit(&#39;update:xxx1&#39;, $event.target.value)&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">xxx1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">xxx</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:value=&quot;xxxx2&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">@change=&quot;$emit(&#39;update:xxx2&#39;, $event.target.value)&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">xxx</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div></li></ul><h2 id="组件生命周期和根组件一致" tabindex="-1">组件生命周期和根组件一致 <a class="header-anchor" href="#组件生命周期和根组件一致" aria-label="Permalink to &quot;组件生命周期和根组件一致&quot;">​</a></h2><ul><li>基本上符合常识的就是子组件周期正好发生在父组件周期中</li><li>父 beforeCreated</li><li>父 Created</li><li>父 beforeMounted</li><li>子 beforeCreated</li><li>子 Created</li><li>子 beforeMounted</li><li>子 Mounted</li><li>父 Mounted</li><li>父 beforeUpdated</li><li>子 beforeUpdated</li><li>子 updated</li><li>父 updated</li><li>父 beforeDestroy</li><li>子 beforeDestroy</li><li>子 destroyed</li><li>父 destroyed</li></ul>`,24),h=[n];function k(e,p,r,d,o,E){return s(),a("div",null,h)}const c=i(t,[["render",k]]);export{y as __pageData,c as default};