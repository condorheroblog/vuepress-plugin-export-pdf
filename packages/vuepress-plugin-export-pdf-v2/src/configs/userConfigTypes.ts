import type { PDFOptions, PuppeteerLaunchOptions } from "puppeteer";
import type { Bundler, Page, Theme } from "vuepress";

export type UserSorter = (a: Page, b: Page) => number;

/**
 * defined user config
 */
export interface UserConfig {
  theme?: Theme
  bundler?: Bundler
  sorter?: UserSorter
  puppeteerLaunchOptions?: PuppeteerLaunchOptions
  routePatterns?: string[]
  pdfOptions?: PDFOptions
  outFile?: string
  outDir?: string
}
