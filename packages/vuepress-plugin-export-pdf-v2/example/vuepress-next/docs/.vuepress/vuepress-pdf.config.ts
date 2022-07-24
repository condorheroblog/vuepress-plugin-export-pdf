import { defineUserConfig } from '@condorhero/vuepress-plugin-export-pdf-v2';
import { defaultTheme, viteBundler } from "vuepress";

export default defineUserConfig({
  theme: defaultTheme(),
  bundler: viteBundler(),
  outFile: 'vuepress-v2-example.pdf',
  outDir: "pdf-v2",
  pdfOptions: {
    format: "A4",
  }
})
