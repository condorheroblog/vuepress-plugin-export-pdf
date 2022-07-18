import type { NavbarConfig } from 'vuepress'

export const navbarZh: NavbarConfig = [
  {
    text: '指南',
    link: '/zh/guide/',
  },
  {
    text: '了解更多',
    children: [
      {
        text: '深入',
        children: [
          '/zh/advanced/plugin.md',
          '/zh/advanced/theme.md',
        ],
      },
      {
        text: 'Awesome VuePress',
        link: 'https://github.com/vuepress/awesome-vuepress',
      },
    ],
  },
]
