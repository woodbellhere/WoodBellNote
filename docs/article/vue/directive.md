# Vue 指令系列

## v-html

- 设置元素 innerHtml
- 尽量只展示开发者的内容，不然又 xss 注入是吧
- 不支持组件

```js
<div v-html='a'></div>
<script setup>
  const a=<section style='color:red'>woodbell</section>
</script>
```

## vue-text

```js
<div v-text='a'></div>
<script setup>
  const a='woodbell'
</script>
```

## v-bind

- v-bind 的简写为：
- style 和 class 等常用属性都可以绑定
- 考虑到标签原有的 class，vue 支持一组 class 事先绑定，一组 class 动态绑定
- v-bind 花样普通的是 :[] = xxx [] @[] = xxx []中可以任意指定希望动态变化的属性或事件
- 动态绑定 class 的方法是比较奇特的
  - 可以普通单个绑定样式
  - 可以数组风格绑定，数组元素直接为 data 中的属性，属性值写单个样式(其实也可以理解成数组取子集嗷)
  - 也可以对象风格绑定，对象 key 需要在样式中先写好，value 是 data 中做判断的值
  - 还可以数组里传对象，数组元素相当于写死，对象元素就临时判断

```js
<div v-bind:id='event'>看看id试试</div>
<div :id='event'>看看id试试</div>
<div :style='style'>看看id试试</div>
<div :class="['a', 'b']">看看id试试</div>
<div :class="[judge ? 'a':'b']">看看id试试</div>
<div class='c' :class="[judge ? 'a':'b']">看看id试试</div>
<script setup>
  const event = 'click'
  const judge = true
  const style = {
    color:'red',
    border:'1px solid #ccc'
  }
</script>
<style>
  .a {
    color:red
  }
  .b{
    border: 1px solid #ccc
  }
  .c{
    background-color:blue
  }
</style>
```

## v-on

- 支持 v-on 简写为@
- 支持多个回调函数 @click='fun1, fun2(xxx)'以及它的参数
- 支持动态事件@[event]
- 支持事件修饰符
  - prevent
  - stop 阻止冒泡，非常直观
  - capture 捕获触发
  - self 只处理自己元素的事件
  - once 只处理一次

```js
<div v-on:click="xxx">点一下试试</div>
<div @click="xxx">点一下试试</div>
<button @click.prevent="xxx">点一下试试</button>
<div v-on:[event]="xxx">点一下试试</div>
<script setup>
  const event = 'click'
  const xxx = () => {console.log('clicked')}
</script>
```

- 获取 event 对象时，绑定这里需要传入$event
- 在内联语法中 $event 就是传递 event target 的标准方式

## v-model

- v-model 相当于 @input 和 {{xxx}}联合的语法糖
- 由于触发 js 行为，可能阻塞页面渲染，还是尽量加 lazy
- 多选框绑定的对象是一个数组，其他基本都是空字符串占位

- v-model

  ```js
  <input v-model='a' type='text'>
  <script setup>
    import { ref } from 'vue'
    const a = ref('woodbell')
  </script>
  ```

- 阻止默认有两种方法，一个是事件监听可以主动传 e/event 参数，e.preventDefault 完事，另一种就是用 vue 指令.prevent
- key 事件中驼峰命名的在 vue 里要改横线命名
- exact 修饰符的作用是不接受连续操作，比如只要空格，就不容忍你之前按空格

- 表单修饰符
- lazy 动作彻底完成，比如失焦时再触发事件
- trim
- number 把默认的字符串转为 number， 使用 parseFloat，或者设置表单的 type 为 number

## v-if & v-show

使用 v-if 和 v-show 包裹一批元素的方式

- 都要求同级 html 元素,或者说需要紧挨着
- 如果想分组展示，用任意元素包裹起来，再把包裹元素写 v-else 就行
- 因为会直接删除节点，所以动画效果基本会拉
- template 又成了一种推荐方式
- v-show 不能和 template 一起用

v-if 和 v-show 的作用方式

- v-if 是将变为注释节点
- v-show 只是将 display：none，也会搞坏动画

基本评价

- v-show 在切换时的性能高于 v-if
- v-if 在生成销毁时性能高于 v-show

  ```js
  <div v-if='a'>true</div>
  <div v-else-if='a === false'>else-if</div>
  <div v-else>else</div>
  <script setup>
    const a= false
  </script>
  ```

  ```js
  <div v-show='a'>true</div>
  <script setup>
    const a= false
  </script>
  ```

## v-for

- 有子元素和 index 两个参数
- 支持嵌套循环
- v-for 的更新默认或者说没 key 时是原地更新，是 diff 算法的实际执行
- 但元素顺序确实重要时，设置 key 属性有助于 vue 按顺序更新
- 通过 n in num v-for 可以实现 r 和 matlab 的序列生成

  ```js
  <div v-for='(item, index) in a' :key='xxx'>
  {{ index+1}}-{{ item }}
  <div v-for='item.xxx'>{{xxx}}</div>
  </div>
  <script setup>
    const a = ['wood', 'bell', 'woodbell']
  </script>
  ```

## v-once

- 只渲染一次
- 因此也可以用来锁定初始值

```js
<div v-once>123</div>
```

## v-memo

- 条件成立时跳过更新，手动控制缓存嘛
- 传[]和 v-once 一样
- 一般配合 v-for 操作

```js
<div v-for='(item, index) in a' :key='xxx' v-memo='[item ===2]'>
{{ index+1}}-{{ item }}
</div>
<script setup>
  const a = ['wood', 'bell', 'woodbell']
</script>
```

## v-cloak

- 在没构建的版本中，可以配合样式隐藏尚未加载的内容
- [v-cloak] {display:none}
- v-once 某个元素只渲染一次，对于保存响应式数据的初始值还蛮有用的

## 自定义指令

- 使用和 data 等同级的 directive 配置项
- 全局定义就变成 app.directive
- 主要是设置在不同生命周期的行为,由于最常用的就是挂载和更新，所以只有这两个周期时可以省略设置
- 主要参数是 el 和 binding，分别是被绑定 html 元素和传入指令的值
- binding 可以接收动态传参

  ```js
  app.directive("fsize", {
    mounted(el, binding) {
      el.style.fontSize = binding.value + "px";
    },
  });
  <p v-fsize="18">这是一个段落</p>;
  <p v-fsize:[unit]="fontSize">这是一个段落</p>
  app.directive("fsize", (el, binding) => {
    el.style.fontSize = binding.value + (binding.arg || "px");
  });
  ```
