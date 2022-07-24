import type { NavbarConfig } from 'vuepress'

export const navbarEn: NavbarConfig = [
  {
    text: 'Guide',
    link: '/guide/',
  },
  {
    text: 'Learn More',
    children: [
      {
        text: 'Advanced',
        children: [
          '/advanced/plugin.md',
          '/advanced/theme.md',
        ],
      },
      {
        text: 'Awesome VuePress',
        link: 'https://github.com/vuepress/awesome-vuepress',
      },
    ],
  },
]
