import type { LaunchOptions, PDFOptions, Page } from '@condorhero/vuepress-plugin-export-pdf-core'
import type { Bundler, Theme } from 'vuepress'

export type UserSorter = (a: Page, b: Page) => number

/**
 * defined user config
 */
export interface UserConfig {
  theme?: Theme
  bundler?: Bundler
  sorter?: UserSorter
  puppeteerLaunchOptions?: LaunchOptions
  routePatterns?: string[]
  pdfOptions?: PDFOptions
  outFile?: string
  outDir?: string
  pdfOutlines?: boolean
  urlOrigin?: string
  outlineContainerSelector?: string
}
