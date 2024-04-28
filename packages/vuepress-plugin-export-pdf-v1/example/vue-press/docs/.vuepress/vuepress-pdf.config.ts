import { defineUserConfig } from '@condorhero/vuepress-plugin-export-pdf'

export default defineUserConfig({
  theme: '@vuepress/theme-default',
  outFile: 'vuepress-example.pdf',
  outDir: 'pdf',
  pdfOptions: {
    format: 'A0',
  },
})
