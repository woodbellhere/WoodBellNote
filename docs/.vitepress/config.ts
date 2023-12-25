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
          { text: "BFC", link: "/notes/BFC" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
