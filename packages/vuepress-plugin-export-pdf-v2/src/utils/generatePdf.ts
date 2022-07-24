import type { DevApp } from "vuepress";
import type { PDFOptions, PuppeteerLaunchOptions } from "puppeteer";
import { chalk, fs, logger, path } from "@vuepress/utils";
import puppeteer from "puppeteer";
import type { UserSorter } from "../configs";

import { mergePDF } from "./mergePDF";

interface IGeneratePdfOptions {
  port: number
  host: string
  outFile: string
  outDir: string
  sorter?: UserSorter
  puppeteerLaunchOptions?: PuppeteerLaunchOptions
  pdfOptions?: PDFOptions
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
}: IGeneratePdfOptions) => {
  const { pages, options: { temp: tempPath } } = ctx;
  const tempPdfDir = join(tempPath, "pdf");
  fs.ensureDirSync(tempPdfDir);

  let exportPages = pages.slice(0);

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

  const browser = await puppeteer.launch(puppeteerLaunchOptions);

  for (const { location, pagePath, url, title } of normalizePages) {
    const browserPage = await browser.newPage();
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

    const pathUrl = gray(`${url}`);

    logger.success(`Generated ${yellow(title)} ${pathUrl}`);

    browserPage.close();
  }

  await mergePDF(normalizePages, outFile, outDir);

  await browser.close();

  fs.removeSync(tempPdfDir);
};
