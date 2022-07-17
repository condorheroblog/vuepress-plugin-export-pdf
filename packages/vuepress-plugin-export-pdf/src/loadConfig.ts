
/**
 * Module dependencies.
 */
import type { PDFOptions, PuppeteerLaunchOptions } from "puppeteer";
import { fs, path } from "@vuepress/utils";
import { bundleRequire } from "bundle-require";

export async function parseConfig(configPath: string) {
  const [extension] = /.\w+$/.exec(configPath) as string[];
  if (extension === ".js" || extension === ".ts") {
    const { mod } = await bundleRequire({
      filepath: configPath,
    });

    return mod.default || mod;
  }

  throw new Error("Illegal suffix of configuration file,Check whether it is a `.js` or `.ts` file");
}

/**
* Expose loadConfig.
*/

export default function loadConfig(vuepressDir: string, config: string): Promise<{
  themeConfig: string
  puppeteerLaunchOptions?: PuppeteerLaunchOptions
  pageOptions?: PDFOptions
  outputFileName?: string
  sorter?: (a: any, b: any) => number
}> {
  const configJsPath = path.resolve(vuepressDir, config ?? "vuepress-pdf-config.js");
  const configTsPath = path.resolve(vuepressDir, config ?? "vuepress-pdf-config.ts");

  // resolve siteConfig
  let siteConfig = {};
  if (fs.existsSync(configTsPath))
    siteConfig = parseConfig(configTsPath);

  else if (fs.existsSync(configJsPath))
    siteConfig = parseConfig(configJsPath);

  return Promise.resolve(siteConfig);
}
