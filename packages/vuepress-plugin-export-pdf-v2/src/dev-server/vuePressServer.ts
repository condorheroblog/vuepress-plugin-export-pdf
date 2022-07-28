import { chalk, logger, path } from "@vuepress/utils";
import { createDevApp, defaultTheme, viteBundler } from "vuepress";
import debug from "debug";
import type { UserConfig } from "../configs";

import { loadModule, resolveUserConfigConventionalPath, resolveUserConfigPath } from "../configs";
import { checkEnv, generatePdf, timeTransformer } from "../utils";
import pkg from "../../package.json";

const { red } = chalk;
const { join } = path;

interface CommandOptions {
  config?: string
  outDir?: string
  outFile?: string
  debug?: boolean
}

const devDebug = debug("vuepress-plugin-export-pdf-v2:dev-server");

export const vuePressServer = async(dir = "docs", commandOptions: CommandOptions = {}) => {
  const sourceDir = join(process.cwd(), dir);

  if (commandOptions.debug)
    debug.enabled("vuepress-plugin-export-pdf-v2:*");

  devDebug("sourceDir: %s", sourceDir);

  let userConfig: UserConfig = {};

  // resolve user config file
  const userConfigPath = commandOptions.config
    ? resolveUserConfigPath(commandOptions.config)
    : resolveUserConfigConventionalPath(sourceDir);

  if (userConfigPath)
    userConfig = await loadModule(userConfigPath);

  // set default routePatterns
  if (Array.isArray(userConfig.routePatterns))
    userConfig.routePatterns = ["/**", "!/404.html", ...userConfig.routePatterns];
  else
    userConfig.routePatterns = ["/**", "!/404.html"];

  const vuepressOutFile = commandOptions.outFile ?? `vuepress-${timeTransformer()}.pdf`;
  const vuepressOutDir = commandOptions.outDir ?? ".";

  devDebug("userConfig: %O", userConfig);

  const {
    theme = defaultTheme(),
    bundler = viteBundler(),
    sorter,
    puppeteerLaunchOptions,
    pdfOptions,
    outFile = vuepressOutFile,
    outDir = vuepressOutDir,
    routePatterns,
    enhanceApp,
  } = userConfig;

  const devApp = createDevApp({ source: sourceDir, bundler, theme, host: "localhost", port: 8714 });
  checkEnv(pkg.engines.node, devApp.version);

  // initialize and prepare
  await devApp.init();
  await devApp.prepare();

  // start dev server
  const closeDevServer = await devApp.dev();

  logger.tip("Start to generate current site to PDF ...");

  try {
    await generatePdf(devApp, {
      port: devApp.options.port,
      host: devApp.options.host,
      outFile,
      outDir,
      sorter,
      puppeteerLaunchOptions,
      pdfOptions,
      routePatterns,
      enhanceApp,
    });
  }
  catch (error) {
    logger.error(red(error));
  }

  // close current dev server
  closeDevServer();
  process.exit(0);
};
