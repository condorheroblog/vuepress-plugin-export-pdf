import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { description } from '../../package.json'
import { bundler, head, navbarEn, navbarZh, sidebarEn, sidebarZh } from './configs'

export default defineUserConfig({
  // set site base to default value
  base: '/docs/',

  title: 'vuepress-next',
  lang: 'en-US',
  description,
  bundler,

  head,

  markdown: {
    code: {
      lineNumbers: true,
    },
  },

  // site-level locales config
  locales: {
    '/': {
      lang: 'en-US',
      title: 'VuePress-next',
      description: 'Vue-powered Static Site Generator',
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'VuePress-next',
      description: 'Vue 驱动的静态网站生成器',
    },
  },

  theme: defaultTheme({
    home: '/',
    docsDir: 'docs',
    repo: 'https://github.com/condorheroblog/vuepress-plugin-export-pdf/tree/main/packages/vuepress-plugin-export-pdf/vuepress-next',

    // theme-level locales config
    locales: {
      /**
       * English locale config
       *
       * As the default locale of @vuepress/theme-default is English,
       * we don't need to set all of the locale fields
       */
      '/': {
        // navbar
        navbar: navbarEn,
        // sidebar
        sidebar: sidebarEn,
        // page meta
        editLinkText: 'Edit this page on GitHub',
      },

      /**
       * Chinese locale config
       */
      '/zh/': {
        // navbar
        navbar: navbarZh,
        selectLanguageName: '简体中文',
        selectLanguageText: '选择语言',
        selectLanguageAriaLabel: '选择语言',
        // sidebar
        sidebar: sidebarZh,
        // page meta
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdatedText: '上次更新',
        contributorsText: '贡献者',
        // custom containers
        tip: '提示',
        warning: '注意',
        danger: '警告',
        // 404 page
        notFound: [
          '这里什么都没有',
          '我们怎么到这来了？',
          '这是一个 404 页面',
          '看起来我们进入了错误的链接',
        ],
        backToHome: '返回首页',
        // a11y
        openInNewWindow: '在新窗口打开',
        toggleColorMode: '切换颜色模式',
        toggleSidebar: '切换侧边栏',
      },
    },
  }),
})
