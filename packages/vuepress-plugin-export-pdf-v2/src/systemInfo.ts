import { chalk, logger, ora } from "@vuepress/utils";
import envinfo from "envinfo";

/**
 * Display environment information.
 */
export const systemInfo = async(): Promise<void> => {
  const spinner = ora();
  spinner.start(chalk.bold("\nCollecting Environment Info:"));

  const result = await envinfo.run(
    {
      System: ["OS", "CPU", "Memory", "Shell"],
      Binaries: ["Node", "Yarn", "npm"],
      Utilities: ["Git"],
      Browsers: ["Chrome", "Edge", "Firefox", "Safari"],
      npmPackages: [
        "@vuepress/bundler-vite",
        "@vuepress/bundler-webpack",
        "@vuepress/cli",
        "@vuepress/client",
        "@vuepress/core",
        "@vuepress/markdown",
        "@vuepress/plugin-active-header-links",
        "@vuepress/plugin-back-to-top",
        "@vuepress/plugin-container",
        "@vuepress/plugin-debug",
        "@vuepress/plugin-docsearch",
        "@vuepress/plugin-git",
        "@vuepress/plugin-google-analytics",
        "@vuepress/plugin-medium-zoom",
        "@vuepress/plugin-nprogress",
        "@vuepress/plugin-palette",
        "@vuepress/plugin-prismjs",
        "@vuepress/plugin-pwa",
        "@vuepress/plugin-pwa-popup",
        "@vuepress/plugin-register-components",
        "@vuepress/plugin-search",
        "@vuepress/plugin-shiki",
        "@vuepress/plugin-theme-data",
        "@vuepress/plugin-toc",
        "@vuepress/shared",
        "@vuepress/theme-default",
        "@vuepress/utils",
        "vuepress",
        "vuepress-vite",
        "vue",
        "vue-router",
        "vue-loader",
      ],
    },
    {
      showNotFound: true,
      duplicates: true,
      fullTree: true,
    },
  );
  spinner.stop();

  logger.info(result);
};
