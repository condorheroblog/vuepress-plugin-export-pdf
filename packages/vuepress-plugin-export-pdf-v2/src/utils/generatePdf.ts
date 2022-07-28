import type { DevApp } from "vuepress";
import type { PDFOptions, PuppeteerLaunchOptions } from "puppeteer";
import { chalk, fs, path } from "@vuepress/utils";
import puppeteer from "puppeteer";
import type { EnhanceApp, UserSorter } from "../configs";

import { filterRoute, singleProgressBar } from "../utils";
import { mergePDF } from "./mergePDF";

interface IGeneratePdfOptions {
  port: number
  host: string
  outFile: string
  outDir: string
  routePatterns: string[]
  sorter?: UserSorter
  puppeteerLaunchOptions?: PuppeteerLaunchOptions
  pdfOptions?: PDFOptions
  enhanceApp?: EnhanceApp
}

const { yellow, gray } = chalk;
const { join } = path;

/**
 * Generate PDF from VuePress dev server.
 * @param ctx - Context
 * @param param1 IGeneratePdfOptions
 */
export const generatePdf = async(ctx: DevApp, {
  port,
  host,
  sorter,
  outFile,
  outDir,
  puppeteerLaunchOptions,
  pdfOptions,
  routePatterns,
  enhanceApp,
}: IGeneratePdfOptions) => {
  const { pages, options: { temp: tempPath } } = ctx;
  const tempPdfDir = join(tempPath, "pdf");
  fs.ensureDirSync(tempPdfDir);

  let exportPages = filterRoute(pages, routePatterns);

  if (typeof sorter === "function")
    exportPages = exportPages.sort(sorter);

  const normalizePages = exportPages.map((page) => {
    return {
      url: page.path,
      title: page.title,
      location: `http://${host}:${port}${page.path}`,
      pagePath: `${tempPdfDir}/${page.key}.pdf`,
    };
  });

  const singleBar = singleProgressBar(`Generating {bar} {value}/{total} || ${yellow("{title}")} ${gray("{url}")}`);
  singleBar.start(normalizePages.length, 0);

  const browser = await puppeteer.launch(puppeteerLaunchOptions);

  for (const { location, pagePath, url, title } of normalizePages) {
    const browserPage = await browser.newPage();
    typeof enhanceApp === "function" && enhanceApp(browser, browserPage);
    browserPage.setDefaultNavigationTimeout(0);

    await browserPage.goto(
      location,
      { waitUntil: "networkidle2" },
    );

    await browserPage.pdf({
      path: pagePath,
      format: "A4",
      ...pdfOptions,
    });

    browserPage.close();

    singleBar.increment(1, {
      title,
      url,
    });
  }

  singleBar.stop();
  await mergePDF(normalizePages, outFile, outDir);

  await browser.close();

  fs.removeSync(tempPdfDir);
};
