const { description } = require('../../package');

module.exports = {
  title: 'vue-press',
  description: description,

  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
  ],

  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    nav: [
      {
        text: 'markdown',
        link: '/markdown/',
        collapsable: true,
      },
    ],
    sidebarDepth: 2,
    sidebar: [
      {
        title: 'guilde',
        sidebarDepth: 1,
        collapsable: true,
        children: [
          '/guilde/',
        ],
      },
      {
        title: 'markdown',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          '/markdown/',
          { title: 'extends', path: 'markdown/article/01.md' },
        ],
        initialOpenGroupIndex: 1,
      },
    ],
  },
  // plugins: [[require("./vuepress-plugin-export-pdf.js"), {
  //   name: 'vuepress-plugin-export-pdf', sorter: (a, b) => {
  //     return a - b;
  //   }
  // }]],
}
