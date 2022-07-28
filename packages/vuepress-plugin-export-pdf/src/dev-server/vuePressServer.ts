import { chalk, logger, path } from "@vuepress/utils";
import { dev } from "vuepress";
import debug from "debug";
import type { UserConfig } from "../configs";

import { loadModule, resolveUserConfigConventionalPath, resolveUserConfigPath } from "../configs";
import { generatePdf, timeTransformer } from "../utils";

const { red, cyanBright } = chalk;
const { join } = path;

interface CommandOptions {
  config?: string
  theme?: string
  outDir?: string
  outFile?: string
  debug?: boolean
}

const devDebug = debug("vuepress-plugin-export-pdf:dev-server");

export const vuePressServer = async(dir = "docs", commandOptions: CommandOptions = {}, extendCliConfig?: UserConfig) => {
  const sourceDir = join(process.cwd(), dir);

  if (commandOptions.debug)
    debug.enabled("vuepress-plugin-export-pdf:*");

  devDebug("sourceDir: %s", sourceDir);

  let userConfig: UserConfig = {};

  if (extendCliConfig) {
    userConfig = extendCliConfig;
  }
  else {
    // resolve user config file
    const userConfigPath = commandOptions.config
      ? resolveUserConfigPath(commandOptions.config)
      : resolveUserConfigConventionalPath(sourceDir);

    if (userConfigPath)
      userConfig = await loadModule(userConfigPath);
  }

  // set default routePatterns
  if (Array.isArray(userConfig.routePatterns))
    userConfig.routePatterns = ["/**", "!/404.html", ...userConfig.routePatterns];
  else
    userConfig.routePatterns = ["/**", "!/404.html"];

  const vuepressTheme = commandOptions.theme ?? "@vuepress/default";
  const vuepressOutFile = commandOptions.outFile ?? `vuepress-${timeTransformer()}.pdf`;
  const vuepressOutDir = commandOptions.outDir ?? ".";

  devDebug("userConfig: %O", userConfig);

  const {
    sorter,
    puppeteerLaunchOptions,
    pdfOptions,
    outFile = vuepressOutFile,
    outDir = vuepressOutDir,
    theme = vuepressTheme,
    routePatterns,
    enhanceApp,
  } = userConfig;

  const devContext = await dev({
    sourceDir,
    clearScreen: false,
    theme,
  });

  await new Promise((resolve) => {
    devContext.devProcess.server.compiler.hooks.done.tap("webpack-dev-server", () => {
      logger.success(cyanBright("VuePress dev server compiler done\n"));
      resolve(true);
    });
  });

  logger.tip("Start to generate current site to PDF ...");

  try {
    await generatePdf(devContext, {
      port: devContext.devProcess.port,
      /**
         * Why not devContext.devProcess.host
         * Because will get http://0.0.0.0:8080, and then fail
         * @see https://github.com/vuejs/vuepress/commit/4d5c50e
        */
      host: devContext.devProcess.displayHost,
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

  devContext.devProcess.server.close();
  process.exit(0);
};
