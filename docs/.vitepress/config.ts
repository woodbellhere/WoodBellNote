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
        text: "前端学习记录",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
      {
        text: "手写汇总",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
      {
        text: "待整理文字",
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
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
