import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "zh-CN",
  title: "WoodBell NoteBook",
  description: "A NoteBook Site Powered By Vitepress",
  base: "/WoodBellNote/",
  srcDir: "article",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "About", link: "/about/resume" },
    ],
    // 这里一个对象就会在目录上自然分一组
    sidebar: [
      {
        text: "Vue集合",
        items: [
          { text: "Vue3的新变化和新优化", link: "/vue/changes&Performance" },
          { text: "Vue的template与其解析", link: "/vue/template" },
          { text: "Vue指令的用法和注意事项", link: "/vue/directive" },
          { text: "VueDiff算法的文字性理解", link: "/vue/VueAlog" },
          { text: "Vue中的生命周期", link: "/vue/lifeCycle" },
          { text: "Vue中的options API", link: "/vue/options" },
          {
            text: "Vue中的compositional API和setup函数",
            link: "/vue/mixin&setup",
          },
          { text: "setup语法糖", link: "/vue/setup" },
          { text: "响应式全家桶（还有整理的余地）", link: "/vue/reactive" },
          { text: "组件间数据传递/通信", link: "/vue/propsTransfer" },
          { text: "路由和vue-router", link: "/vue/router" },
          { text: "状态管理和vuex/pinia", link: "/vue/vuex&pinia" },
          { text: "render函数(占坑)", link: "/vue/render" },
        ],
      },
      {
        text: "工程化相关内容",
        items: [
          { text: "模块化历史梳理", link: "/engineering/moduleHistory" },
          { text: "模块常用操作", link: "/engineering/modulePractice" },
          {
            text: "构建工具的发明动机",
            link: "/engineering/motivationOfBuild",
          },
          {
            text: "webpack的使用说明",
            link: "/engineering/webpack",
          },
          {
            text: "vite的使用说明",
            link: "/engineering/vite",
          },
        ],
      },
      {
        text: "手写汇总",
        items: [
          { text: "typeof相关", link: "/handWriting/typeof" },
          { text: "instanceof相关", link: "/handWriting/instanceof" },
          { text: "toString终极方案", link: "/handWriting/toString" },
          { text: "promise系列(但没promise)", link: "/handWriting/promise" },
          { text: "new", link: "/handWriting/new" },
          { text: "数组去重", link: "/handWriting/unique" },
          { text: "数组扁平化", link: "/handWriting/flat" },
          { text: "深克隆(先开个坑)", link: "/handWriting/deepClone" },
        ],
      },
      {
        text: "html+css常识",
        items: [
          { text: "html标签", link: "/notes/html" },
          { text: "table的注意点", link: "/notes/table" },
          { text: "form的注意点", link: "/notes/form" },
          { text: "网页嵌入式元素", link: "/notes/embed" },
          { text: "cascade 层叠的意义", link: "/notes/cascade" },
          { text: "css中的值", link: "/notes/cssInCss" },
          { text: "css值的解析", link: "/notes/valueResolve" },
          { text: "css值的继承", link: "/notes/inheritance" },
          { text: "css中的选择器", link: "/notes/selector" },
          { text: "布局和文档流的基本认识", link: "/notes/layout&flow" },
          { text: "VFC", link: "/notes/VFC" },
          { text: "box的基本要点", link: "/notes/BoxSpec" },
          { text: "BFC", link: "/notes/BFC" },
          { text: "position定位", link: "/notes/position" },
          { text: "float与文档流", link: "/notes/float" },
          { text: "喜闻乐见的居中", link: "/notes/center" },
          { text: "flex布局(还有的写)", link: "/notes/flex" },
          { text: "grid流水账", link: "/notes/grid" },
          { text: "transform内容理解", link: "/notes/transform" },
          { text: "杂项", link: "/notes/MISC" },
        ],
      },
      {
        text: "网页设计大观",
        items: [
          { text: "网页设计原则", link: "/design/designPrinciple" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
      {
        text: "待整理/文档缓冲区",
        items: [
          { text: "vue-router再整理", link: "/todo/vueRouter" },
          { text: "vuex再整理", link: "/todo/vuex" },
          { text: "vue3零碎内容", link: "/todo/vue3" },
          { text: "slot零碎内容", link: "/todo/slot" },
          { text: "watch系列零碎内容", link: "/todo/watchSeries" },
          { text: "组件系列再整理", link: "/todo/components" },
          { text: "设计要素再整理", link: "/todo/designFactor" },
          { text: "动画零碎内容", link: "/todo/animation" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
    footer: {
      copyright: "Copyright © 2023-present WooBell",
    },
    search: {
      provider: "local",
    },
  },
});
