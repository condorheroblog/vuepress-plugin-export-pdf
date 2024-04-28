import type { SidebarConfig } from 'vuepress'

export const sidebarEn: SidebarConfig = {
  '/guide/': [
    {
      text: 'Guide',
      children: [
        '/guide/README.md',
        '/guide/assets.md',
        '/guide/bundler.md',
      ],
    },
  ],
  '/advanced/': [
    {
      text: 'Advanced',
      children: [
        '/advanced/plugin.md',
        '/advanced/theme.md',
      ],
    },
  ],
}
