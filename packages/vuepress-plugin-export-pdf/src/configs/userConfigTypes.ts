import type { PDFOptions, PuppeteerLaunchOptions } from "puppeteer";
import type { Page } from "vuepress";

export type UserSorter = (a: Page, b: Page) => number;

/**
 * defined user config
 */
export interface UserConfig {
  theme?: string
  sorter?: UserSorter
  puppeteerLaunchOptions?: PuppeteerLaunchOptions
  routePatterns?: string[]
  pdfOptions?: PDFOptions
  outFile?: string
  outDir?: string
}
