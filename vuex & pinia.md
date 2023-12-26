# vue 的状态管理

- 应用规模变大之后
- props 传递和触发的链条会越来越长也越来越复杂
- 集中管理这些数据成为一种好的解决方式
- 这些被依赖的数据就是所谓状态

Vuex 核心是一个 store

- 其中包含全局状态和修改状态的 mutation
- 组件通过触发 mutations 来修改状态
- 修改后所有使用状态的组件都会刷新

其他功能

- 异步操作 actions
- 计算属性风格的计算状态的 getters
- 分隔大型 store 的 module 模式

支持

- 插件扩展日志和持久化等
- 与 router 同步的插件等

- slots 也是一种铺平状态的方法
- 组件本身也有局部状态

- 引入 createStore 来创建 store
  - 在其中定义 state（也相当于 data）
  - 在 mutation 中定义更新事件，在组件中会通过 commit 触发
- 再全局实例中 use 这一 store
- 在组件中通过 this.$store.xxx 来获取状态
- 在组件中通过 this.$store.commit('mehtodName')来触发状态更新

- 访问与获取状态
- vuex 已经将 store 注入到所有实例中
- 在组件中通行方式是定义计算属性来接状态
- 为了避免一个一个引入的麻烦，引入 mapState 作为计算属性 即可将全局状态映射到组件上
- 定义具体状态的方式有两种
  - 一种 xxx: (state) => state.xxx
  - 另一种 xxx : 'xxx'
- 另外还有一种数组式，请求的状态直接同名使用即可
  - mapState(['xxx1', 'xxx2', 'xxx3'])
- 如果组件还有自定义计算属性，则使用扩展符将 mapState 的结果展开，然后正常定义自己的即可

- 定义和触发状态更新的 mutation
- vuex 中的 methods
- 主要是定义一个 increment(state) 函数，对状态正常操作即可
- 组件中可以通过 mapMutations 映射到组件上
- mutation 也可以有第二个参数 payload， 主要就是向上传递的数据
- payload 默认是对象，因而可以传递多个状态

  ```javascript
  pushToArr(state, payload) {
      state.arr.push(payload.ele);
    },
  <button @click="pushToArr({ ele: arr.length + 1 })">追加元素</button>
  ```

- 作为计算属性的 getters
- 思路就和 state 以及 mutation 差不多了
- getter 如果返回函数就不缓存
- 也有 mapgetters
- getters 也能调用其他 getters，写 sql 了是吧，传参的时候多加一个 getters，用的时候.语法就完事

- 异步操作的 actions
- 整体和 mutation 类似
- 通过 dispatch 触发 mutations 来修改全局状态
- 参数 context 在内容上和当前实例一样，所以可以 context.commit，也可以解构语法{commit, dispatch(也是)} ,但和当前实例还就不是一个东西
- 别忘了嗷，commit 是触发 mutation 的，dispatch 是触发 action 的，但是 action 多半要触发 mutation
- 在 actions 中也可以触发其他 actions
- 组件里自然也有 mapActions，替换了 this.$store.dispatch

- 日志插件
- plugins 配置项的:[createLogger()]

- 为什么区分同步异步的 mutation 和 action？
- mutations 不会等待异步函数执行，vue 只追踪 mutation 函数本身的执行，实际的状态应该是按时间戳检查的
- action 则一定等计时器完成才执行 mutation，状态变化就是清除的

- 表单与状态管理
- 一般来说在组件内管理就行，没必要搞全局状态
- v-model 能够正常响应式修改值，但是 vuex 捕捉不到状态变化，因为 v-model 不触发 mutation
- 一种麻烦的法子是写个查改的 mutation（比如纯粹多余的 state[payload.field]），然后表单组件同时接住 state 和 mutation，接着再用手动 v-model 绑定住值就行

  ```vue
  <input
    id="username"
    type="text"
    :value="user.username"
    @input="
      updateUser({
        field: 'username',
        value: $event.target.value,
      })
    "
  />
  computed: mapState(["user"]), methods: mapMutations(["updateUser"]),
  <!-- main.js -->
  mutations: { updateUser(state, payload) { state.user[payload.field] =
  payload.value; }, },
  ```

- 由于过于麻烦，另一种办法是用 gettet 和 setter 完事
  ```javascript
  computed: { ...mapState(["user"]),
  username: {
  get() {
    return this.user.username; },
  set(value) {
    this.updateUser({ field: "username", value
  })}
  }},
  methods: mapMutations(["updateUser"]),
  <!-- 组件 -->
  <input id="username" type="text" v-model="username" />
  ```
- 可以看到，就是用计算属性的 getter 和 setter 再包一层，读就代替读，写就代替触发 mutation

- 目前似乎没有特别好的办法，大家都本地化？
- 还可以炫一下函数式

  ```javascript
  ...["username", "gender", "occupation"].reduce((obj, field) => {
      obj[field] = {
        get() {
          return this.user[field];
        },
        set(value) {
          this.updateUser({ field, value });
        },
      };
      return obj;
    }, {}),
  ```

- 模块化的状态
- module 是一个和 state 同等级的配置项
- 在不同文件中定义各自 store
- 在一个主 store 的 module 中引入这些分 store
- vue 会在最后自动整合不同模块
- 没有命名空间的前提下，只分模块自己的局部状态和根节点代表的全部状态
- getter 和 mutation 的第一个 state 参数指向子模块的局部状态
- getter 的第二个 getter 指向根节点 getters
- getter 的第三个 rootState 参数指向根节点 state
- action 的第一个 state 参数依然指向局部状态， 第三个 rootState 指向根节点状态
- action 的 commit 指向根节点的 mutation
- action 的 dispatch 触发根节点的 actions
- action 的 getters 指向根节点 getters
- 反正记得试试加个 root

- 模块中的命名空间
- 一大起因是命名冲突
- 可以给子模块加命名空间 namespaced:true，之后触发 mutation 或 action 时需要加上子 store 的名字
- 如果又想在有命名空间的组件中定义全局的状态，那就传的时候改成对象，其中多个 root：true 属性
  ```javascript
  actions: {
    addBlogGlobal: {
      root: true,
      handler({ commit }, payload) {
        setTimeout(() => {
          commit("addBlog", payload);
        }, 1000);
      },
    },
  }
  ```
- 在组件中引入的时候，要么像路由那么用加个斜杠完事，要么额外加一组 mapxxx 啥的，第一个参数传子 store 名，后面正常按数组传
- 记得 getter，mutation 这些全都要被命名空间影响, 不带命名空间就不用管

- 文件划分方式
- module

  - index.js
  - getters.js
  - mutations.js
  - actions.js
  - modules 如果子模块较小
    - 子 store1 整个.js
    - 子 store2 整个.js
  - modules 如果子模块较大
    - 重来一遍上一级的五个文件

- 日志插件的配置参数
- collapsed 默认为 true，折叠
- logActions 默认为 true， 打印 actions 日志
- logMutations 默认为 true， 打印 mutations 日志
- filter（mutation， stateBefore， stateAfter）日志过滤
- actionFilter(action, state) action 日志过滤
- transform(state) 转换/过滤状态日志格式
- mutationTransform(mutation) 字面意思
- actionTransform(action)也是
- logger 自定义日志打印器，默认是 log

- vue devtool 也能看 vuex，能手动调试状态变化

- 状态同步与持久化思路
- 不用像日志插件一样加()
- 一种是页面即将刷新时写入 localStorage， 减少写入次数，增强性能
- 每次触发 mutation 就同步， 同步即时

- pinia
- vue3 以及 composition api 配合的状态库
- mutations 被自动管理了，所以没有这部分了
- 同时也允许直接修改状态
  - v-model 可以直接绑定 pinia 状态
  - vuex 必须要 commit
- store 本身是模块化的，不用命名空间
- store 内部的风格跟 setup 差不多，定义并到处一个 useXXXstore 函数，定义好了内部要 return
- 在组件中使用时用变量接住这个 useXXXstore()就可以，取值的时候 变量名.xxx 完事
- 通过$patch 同时修改多个状态
  - 基本上就是把要通过 store.xxx++ 和 store.yyy-- 放到一起
  - 变成 store$patch({xxx++, yyy--})
- actions 复用状态修改逻辑
- 定义在 store 里
- 在组件触发
- 直观上看比用$patch 省事的多
- 改异步直接加 async 完事，不用多余配置

- 多个 store
- 跟单个 store 没什么区别，直接用完事
- 组件和组件之间也直接 变量接 usexxxstore 完事

- pinia 中使用插件
- 就是生成 pinia 实例 xxx
- 然后 xxx.use(xxx)完事

- ts 和 pinia
- 基本上只有 ref 里没有初始值的时候才需要明确指定类型
- 其他情况下都能自动推断
