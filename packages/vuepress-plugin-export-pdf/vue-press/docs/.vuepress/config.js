const { description } = require('../../package');

module.exports = {
  title: 'VuePress1.x',
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
          { title: 'article', path: 'markdown/article/01.md' },
        ],
        initialOpenGroupIndex: 1,
      },
    ],
  },
}
