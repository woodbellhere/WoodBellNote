# ref 全家桶

响应式数据/状态被直接设置为函数

- ref(), reactive(),computed()
- ref 替代 data 属性，类型是 refimpl
- 传入对象会让对象内所有属性均变为响应式，需要使用 .value 来访问/获取值
- 还是用 getter， setter 做的
- 因此 ref 和原值并不是一个值，相等会报错

- reactive 只接受对象，类型是 proxy，效果和 ref 一样,但不使用 .value 语法取值，可以直接.语法访问
- 如果分别 log reactive 和 ref 值，则 reactive 直接返回 proxy，ref 需要.value 才返回 proxy
- 这个就完全是 proxy 了

- ref 也会调用 reactive 来将所有数据转化为响应式的
- ref 一般来说合适，而且数据分散好取
- reactive 则适合一次性定义多个数据，存放配置属性或表单数据

- computed() 函数值方法使用就行

- watch,直接监听 ref 或者 ref.value 的值
- 直接监听 ref 就 watch(xxxref, (newVal, oldVal) => xxx),直接监听解包值报错
- ref.value 就 watch(() => ref.value, (newVal, oldVal) => xxx),非要用回调使用解包值
- 监听对象属性也没啥区别，ref 正常.value，reactive 直接.属性
- 但是监听对象整体的话要注意一下，因为 watch 也是根据 对象引用来判断变化，所以一般情况下直接 watch 对象是没啥用的

  - 一种是配置项设置 deep 为 true,但是返回的新旧值其实是修改前的同一个对象

- 为了获取修改前的值，需要返回对象的克隆， 对 ref.value 做展开语法即可监听

  - 但这个只复制顶层属性，复制引用，所以还是回到深度克隆

- 监听多个响应数据
- 可以多个 watch，也可以按数组方式让 watch 监听多个 ref 或者多个回调 ref，但是监听回调只用写一个

- watchEffect 和 watch
- 作用基本一样，只能获取修改后的值
- watchEffect(callback(anyDataYouWantToWatch)),不需要像 watch 一样指定 ref，而是会自动判断
- 每次数据变化就会执行一次回调
- watch 只有变化才执行回调，但 watchEffect 无论如何先执行一次
- 相当于 while 和 do-while

- watch 等操作后的清理收尾
- watchEffect 中可以引入 onInvalidate 参数
- watch 要在第二个回调函数中引入 oninvalidate 参数
- ```javascript
  watchEffect((onInvalidate) => {
    onInvalidate(() => {
      xxx;
    });
  });
  watch(() + options.value.title, (newVal, oldVal, onInvalidate) => {onInvalidate(() => {xxx})});
  ```

- onValidate 在下次而非本次监听代码前执行

- isRef

  - 就是来判断响应式数据的，业务里用的不多

  ```javascript
  const man = ref { name: "woodbell" };
  const man2 = { name: "woodbell" };
  const changeMan = () => {

    console.log(isRef(man));
    console.log(isRef(man2));
  };
  ```

- shallowRef

  - 相比 ref 可以做深层响应，shallowRef 只能做浅层响应
  - 数据随便写，视图不更新

  ```javascript
  const man3 = shallowRef({ name: "woodbell" });
  //只能改到man3.value, 下面这个 man3.value.name就不是响应的
  const change = () => {
    man3.value.name = "bellwood3";
  };
  //这样就算响应的
  const change2 = () => {
    man3.value = { name: "bellwood3" };
  };
  ```

- triggerRef 决定了 ref 和 shallowRef 的更新

  - 强制更新收集的依赖
  - ref 可能就等于 shallowRef + triggerRef
  - triggerRef 的调用是自动的，这就会有作用域级别的影响
  - 下面这种写法就会导致 man3 作为 shallowRef 也一起更新
    - 跨组件没啥问题

  ```javascript
  const man = ref { name: "woodbell" };
  const man3 = shallowRef({ name: "woodbell" });
  const changeMan = () => {
    man.value.name='bellwood'
    man3.value.name = 'bellwood3'
  };
  ```

  - 相当于直接指定 triggerRef(shallowRef)

  ```javascript
  const man3 = shallowRef({ name: "woodbell" });
  const changeMan = () => {
    man3.value.name = "bellwood3";
    triggerRef(man3);
  };
  ```

- customRef

  - 自定义的 Ref
  - 需要以函数形式 return，内容基本是指定 get 和 set

  ```javascript
  function MyRef<T>(value: T) {
    return customRef((track, trigger) => {
      return {
        get() {
          track();
        },
        set(newVal) {
          value = newVal;
          trigger();
        },
      };
    });
  }
  ```

- ref 在元素中

  - 可以直接获取 DOM

  ```javascript
  <div ref="dom">这是DOM</div>
  const dom = ref<HTMLElement>();
  //因为声明周期问题，函数里才能读到dom渲染之后的值
  const change = () => {
  console.log(dom.value?.innerText);
  };
  ```

- ref 源码
  - ref 有一串重载，最后都是调用 createRef
  - createRef 调用 isRef 进行判断，如果是就直接返回，不是就帮你创建 refimpl
  - RefImpl 是一个类，我们定义的值变成 private，constructor 中又判断 value 是否是 shallow 的，是的话直接返回，不是的话调用 isReactive 做判断
  - isReactive 又判断是不是 obj 类型，是就 reactive 包裹住返回，不是就直接返回 value
  - refimpl 类的其他部分就是 get 和 set 代表的依赖收集和更新
  - 可以看到，在依赖更新部分，ref 和 shallowRef 都调 triggerRef， triggerRef，调 triggerRefValue，triggerRefValue 又调 triggerEffect

reactive

- 和 ref 最主要的区别是只适用对象类型，源码上是因为做了泛型约束
- 以及读写值不需要加.value
- 不能直接=赋值或者说直接重写对象，会跳过 proxy 的拦截，还是要用自带的属性增减方法,比如对象包裹一层再用.语法，或者数组的 push 这些

```javascript
let list = reactive<string[]>([]);
//这样就把list重写，响应性破坏了
const addList = () => {
  setTimeout(() => {
    let res = ["wood", "bell", "woodbell"];
    list = res;
    console.log(list);
  }, 2000);
};
//要改成
const addList = () => {
  setTimeout(() => {
    let res = ["wood", "bell", "woodbell"];
    list.push(...res)
    console.log(list);
  }, 2000);
};
//或者用对象包裹一层，但是这样会整体替换为一个数组，而不是三个数组元素， v-for也要替换成list.arr
let list = reactive<{arr:string[]}>({
  arr:[]
})
const add = () => {
   setTimeout(() => {
    let res = ["wood", "bell", "woodbell"];
    list.arr = res;
    console.log(list.arr);
  }, 2000);
}
```

readonly

- 将响应式对象变为只读的
- 只有在原对象变化时才会跟着变
- 实现父组件向子组件的单向数据流工具
- provide prop 时就可以包一层传

```javascript
<div>
    {{ read }}
</div>
<button @click.prevent="changeSync">改改readonly的原对象</button>
const readList = reactive({ name: "woodbell" });
const read = readonly(readList);
const changeSync = () => {
  readList.name = "bellwood";
  console.log(readList, read);
};
```

shallowReactive

- shallowRef 的 reactive
- 值可以随意写，但是视图不更新
- 和 reactive 一起被函数更改时，也同时触发 trigger 强制更新
- 作者回应是特性，重新渲染时会全局更新

```javascript
<div>
    {{ shallowObj }}
  </div>
  <button @click.prevent="changeShallow">改改shallowReactive</button>
const shallowObj = shallowReactive({
  foo: {
    bar: {
      num: 1,
    },
  },
});
// 这样不更新视图
const changeShallow = () => {
  shallowObj.foo.bar.num = 456;
  console.log(shallowObj);
};
//改成这样就能更新
const changeShallow = () => {
  shallowObj.foo= {
    name:'bellwood'
  }
  console.log(shallowObj)
};
```

reactive 源码

- 首先是有对象类型的泛型约束
- 判断是否 isReadOnly 是则直接返回
- 不然正常 createReactiveObject
  - 如果不是 isObject，直接返回
  - 如果已经是 proxy（好像是几个内置 is-reactive 和 raw 变量），返回
  - 如果能从 weakMap 构成的缓存 proxyMap 中找到，直接返回
  - 如果在白名单 getTargetType 中找到，返回
  - 最后才会包 proxy，然后更新 proxyMap 的内容

to 系列 toRef， toRefs，toRaw

- 修改响应式的值，非响应式的值变化，视图不变
- 从响应式对象中取值还能保持响应性，解构保持响应性

```javascript
const man = { name: "woodbell", age: 25, like: "SSCI" };
const like = toRef(man, "like");
// man的数据会改，但视图不动
const change = () => {
  // man.like = "CSSCI";
  like.value = "CSSCI";
  console.log(man);
};
// 改成响应式就能动
const man = reactive({ name: "woodbell", age: 25, like: "SSCI" });
```

- toRefs 源码
  - 一次性返回一堆 ref

```javascript
const toRefs= <T extends object>(object: T) => {
  const map:any= {}

  for(let key in object) {
    map[key] = toRef(object, key)
  }
  return map
}
```

```javascript
//这样解构就是普通值
const { name, age, like } = man;
const changeRefs = () => {
  console.log(name, age, like);
};
// 这样解构就是ref对象
const { name, age, like } = toRefs(man);
```

toRaw 把响应式数据变成非响应的

- 相当于取出内部属性\_\_v_raw

```javascript
const man = reactive({ name: "woodbell", age: 25, like: "SSCI" });

const changeRaw = () => {
  console.log(man, toRaw(man));
};
// 相当于
const changeRaw = () => {
  console.log(man, man["__v_raw"]);
};
```

toRef, toRefs, toRaw 源码

- 首先调用 object[key]来取出 value
- 然后 isRef 判断是否为响应式，是就直接返回，不是就 ObjectRefImpl 包裹一下
- 这个新的 Impl 不收集依赖也不触发依赖更新，所以非响应式数据没啥用
- Ref 的 impl 则是会收集依赖和触发依赖更新的
- torefs 基本是遍历做上面的事情
- toraw 就是读内置的 raw 属性

- 然后是组合式/函数式写法

```javascript
let fullName = computed(() => firstName.value + "-" + lastName.value);
```

- 这种写法只能读取值，不能修改值，属性其实被 vue 处理为 readOnly

computed 源码

- 最开始还是一串函数重载，主要用来适配各种数据
- 如果 isFunction，就是只读的（函数式就是这样）
- 如果不是，则分别设置 getter 和 setter(选项式)
- 然后 getter，setter 传给 computedRefImpl
  - 其中有 value 存值，以及 dirty 做脏值检查看看是否需要重新计算/还是适用缓存（vue 中默认值为 true），只有依赖变化，trigger 了才会变

---
