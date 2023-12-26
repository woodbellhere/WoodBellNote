# vite 使用说明

## vite 相比 webpack 的优势

开发体验上

- 随着开发规模变大，webpack 要处理的代码越来越多，导致每次启动都要很久

在模块依赖的处理上

- webpack 兼容各种模块方案，通过自己的内部导入导出函数统一实现，每次打包会全部读一遍依赖进行打包（因为只有 esmodule 才能静态解析）
- vite 则默认 esmodule，按需读相应模块，预构建能够直接讲源码交给浏览器处理，同时用 esm 处理依赖

工具链上

- 生产环境打包是 rollup 和 esbuild 完成的

## create-vite 和 vite 的区别是

清水房和精装房

- vite 是打包构建工具
- 而 create-vite 是配置好各种功能的脚手架
  - vite， vue， post-css，babel 等 np

## vite 导入的规矩

esmodule 路径有规矩，浏览器不默认帮你导入 node-module，资源太重了\
vite 的初始配置就能处理 esModule 的寻路,会自动处理非绝对路径和相对路径的引用，开启自动补全

```js
import _ from "/lodash";
import _ from "/node_modules/.vite/lodash";
import __vite__cjsImport0_lodash from "/node_modules/.vite/deps/lodash.js?v=b1d17067";
const _ = __vite__cjsImport0_lodash.__esModule
  ? __vite__cjsImport0_lodash.default
  : __vite__cjsImport0_lodash;
```

浏览器本身不会去多找一步路径，vite 会帮我们一直找到根目录

## vite 的预构建（重大突破）

首先强调不同的导出格式（cjs，esmodule）仍然同时存在

- 预构建就是首先找到实际的依赖（不论 cjs 或者 esmodule），再调用 esbuild 统一处理为 esmodule，最后放到当前目录的 node-modules/.vite/deps，然后统一打包这些模块(我感觉和 webpack 打包模块为函数一样，应该是只是范围更小了)

### 预构建解决的痛点

不同的模块导出格式统一，路径处理可以统一为.vite/deps\
处理多个包传输的性能问题，可能是最大的性能问题，也是 node-modules 长期不受 esmodule 支持的原因之一

- import 模块时容易重复依赖
- vite 能够处理重复依赖，重复导出导入
- 无论你有多少 export import，vite 都能合并同类项，最后集成为一个或几个模块

```js
export default {
  optimizeDeps: {
    // 不对指定模块预构建
    exclude: ["lodash-es"],
  },
};
```

演示的时候用 lodash 和 lodash-es 不预构建的 network 面板你就知道了

## vite 的代码补全配置

### vite 中的 defineConfig 方法

```js
import { defineConfig, optimizeDeps } from "vite";
export default defineConfig {}
```

- 兼容性更强的写法是这样

```js
/** @type import('vite').UserConfig */
const viteConfig = {
  optimizeDeps: {
    exclude: [],
  },
};
export default viteConfig;
```

- 应对不同环境时

  - 可以在 config 函数中 if 判断 command 等于 build 还是 serve，来分别导入不同的 config 文件

```js
// 策略模式写if else
const envResolver = {
  // build: () => Object.assign({}, viteBaseConfig, viteProdConfig),
  build: () => ({ ...viteBaseConfig, ...viteProdConfig }),
  // serve: () => Object.assign({}, viteBaseConfig, viteDevConfig),
  serve: () => ({ ...viteBaseConfig, ...viteDevConfig }),
};
export default defineConfig(({ command }) => {
  // if (command === "build") {
  // } else {
  // }
  return envResolver[command]();
});
```

## vite 与 webpack 的环境变量

### 即根据当前的代码环境产生值的变化的变量就叫环境变量

- 开发环境，生产环境
- 测试环境，预发布环境
- 灰度环境
- 我们前后对接时也会用不同路径，不同环境

vite 帮我们自动切换/读取不同的环境变量

- 其实内部都用 dotenv 实现
- 会读取目录中的.env.xxxx 文件并解析对应环境的变量，注入到 process 对象下,但 vite 考虑到兼容性所以又不会直接注入，可以用 loadEnv 方法手动指定
- config 中也可以设置 envdir 来指定读取的 env 文件,默认是读.env,公用环境，.env.development 默认的开发环境文件，.env.production，默认的生产环境变量

- mode 就是命令行传入的开发/生产模式参数，默认是开发环境

```js
export default defineConfig(({ command, mode }) => {
  console.log("process", process.cwd());
  const env = loadEnv(mode, process.cwd(), "");
  console.log("process", env);
  return envResolver[command]();
});
```

- 在其他文件中调用环境时，可以使用 import.meta.env,vite 处于安全考虑默认拦截将隐私变量加入 import.meta, 所以要记得把 env 文件中的变量加 vite 前缀

```js
//.env文件中
<!-- 一个发请求的例子，在不同环境中直接使用不同配置 -->
const getUserPosition = () => {
  axios.post({
  params: {
    APP_KEY: import.meta.env.ENV_APP_KEY,
  },
  });
};
```

- 前缀可以在 config 文件中通过 envPrefix 修改,不一定非要是 vite,记得加下划线

```js
export default defineConfig({
  optimizeDeps: {
    exclude: [],
  },
  envPrefix: "ENV_",
});
```

## vite 和 css

### 天然支持 css，导入就行

- 似乎是用 fs 读 css 文件，创建一个 style 标签，然后把读到的内容放进标签，接着把标签插进 html
- 最后还要把 css 文件的内容替换为 js 脚本，方便热更新以及模块化（避免会有你和别人协作导致的命名冲突）
- 实现 css 模块的 vite 方法是给 css 文件加 module 前缀 styleA.module.css,然后读取样式时全部从特定模块走.语法即可

```js
<!-- 将css文件改名为xxx.module.css -->
import componentBCss from "./componentB.module.css";
console.log("componentBCss", componentBCss);
const div = document.createElement("div");
document.body.appendChild(div);
div.className = componentBCss.footer;
```

### css 模块化

- 将文件中现有类名按特定规则进行替换，多半是加哈希 footer => footer_i2g3
- 建立内容之间的映射 footer: footer_i2g3
- 然后正常塞进 style 标签
- 把 module.css 的内容转为 js 脚本
- 将创建的映射对象在脚本中默认导出

### css 配置

- 全部交给 postcss 处理，特别是 postcss-modules 这个包
- localsConvention 对 vite 转换原有 css 类名的方式做一些规范，主要就是指定驼峰或者短横线
- scopeBehaviour 规定 css 模块范围，是全局还是模块，模块化就会发现类名后面有 hash
- generateScopedName 规定 vite 打包 css 的命名方式，比如[name]_[local]_[hash:5]
- hashPrefix 所生成的 hash 会根据你的类名“更个性化”,这个 hash 也会参与到最终的 hash
- globalModulePaths 不想进行 css 模块操作的文件路径（所以都是全局的），最好用 path resolve 做绝对路径

```js
css: {
  modules: {
    localsConvention: "camelCase",
    scopeBehaviour: "local",
    // generateScopedName: "[name]_[local]_[hash:5]",
    hashPrefix: "hello",
    globalModulePaths: [],
  },
}
```

### css preprocessorOptions 预处理器配置

- postcss 后处理器
  - 由于已经停止维护，所以流程基本是 less/sass 处理完再给 postcss
  - postcss-preset-env 有一系列工具，包括 autoprefixer
- css 的 sourcemap 配置
  - devSourcemap true 则开启 css 的 sourcemap

## vite 静态资源

### vite 对静态资源基本开箱即用

- 除了动态 api，全是静态资源
- 可以在 src 下专门写一个 image.loader.js 统一处理
- 图片基本统一处理为 rul
  - vite 可以配置资源路径的别名/简写来简化过深层级
  ```js
  resolve: {
    alias: {
      "@": path.resolve(import.meta.url, "./src"),
      "@assets": path.resolve(import.meta.url, "./src/assets"),
    },
  }
  ```
- 打包后的资源有 hash，来控制浏览器缓存机制，小图片也可以使用 base64

```js
  build: {
  minify: false,
  rollupOptions: {
    // 静态资源输出项
    output: "[hash].[name].[ext]",
  },
  assetsInlineLimit: 4 * 1024,
}
```

## vite devserver

- vite 中配置 跨域

```js
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  }
```

## vite 插件

- 生命周期中的处理工具
- vite-alias

- 自动生成所有文件的别名

```js
import { ViteAliases } from "vite-aliases";
plugins: [ViteAliases()],
```

## vite 性能优化的主要方面

### 开发时的打包速度

- webpack 保留缓存 cache 选项，thread-loader 等
- vite 按需加载，第一次构建基本只上传一个页面

### 页面性能指标

- FCP
- LCP
- FID
- 懒加载
- http 优化 缓存方面

### js 方面

- 清除副作用/比如计时器和组件频繁挂载卸载，记得 clear
- 多用 requestAnimation，requestIdleCallback 这些新的高性能 api
- 多用 lodash 的防抖节流和其他方法
- 注意作用域 for 循环的时候 length 可以拿出来设变量

### css

- 多用继承
- 减少嵌套

### 生产

- 体积压缩，tree-shaking
- 图片压缩
- cdn
- 分包

## 具体策略优化-分包

- 浏览器自有缓存，静态资源的名字不变就不会重新拿
- 打包的 hash 值基本随时更新，除非完全没改
- 分包就是对不同更新频率的文件分别打包
- rollupOptions 的 manualChunks，实际上也有自动分包

## 具体策略优化-gzip 压缩

- 照样用插件 vite-plugin-compression
- 打包为块，并在使用时解压缩
- 很多压缩都是后端做，很多时候请求本身也要求.gz 文件，这时候你就别多事
- 服务器在响应头中设置 content-encoding
- 体积不大的话不要 gzip，浏览器解包也要时间

## 具体策略优化-动态导入

- 就是 import()

## 具体策略优化-cdn 加速

- 文件打包后会放到服务器上
- 建议一般三方依赖挂 cdn，本体代码维持一个小规模
- vite-plugin-cdn-import

```js
plugins: [
    viteCDNPlugin({
      // 纯粹以lodash为例子
      modules: {
        name: "lodash",
        var: "_",
        path: "https://cdn/jsdeliver.net/npm/lodash@4.17.21/lodash.min.js",
      },
    }),
  ],
  build: {
  rollupOptions: {
    // 相当于在原生rollup里这么搞
    external: ["lodash"],
    externalGlobal: {
      var: "_",
      path: "https://cdn/jsdeliver.net/npm/lodash@4.17.21/lodash.min.js",
    },
  },
  }
```

## vite 配跨域

```js
server: {
    proxy: {
      "/api": {
        target: "https://www.360.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
```

生产环境一般交给后端 nginx 配跨域
