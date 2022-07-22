import { chalk, logger, ora } from "@vuepress/utils";
import envinfo from "envinfo";

/**
 * Display environment information.
 */
export const systemInfo = async(): Promise<void> => {
  // TODO: report @vuepress/utils
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  // eslint-enable @typescript-eslint/ban-ts-comment
  const spinner = ora();
  spinner.start(chalk.bold("\nCollecting Environment Info:"));

  const result = await envinfo.run(
    {
      System: ["OS", "CPU", "Memory", "Shell"],
      Binaries: ["Node", "Yarn", "npm"],
      Utilities: ["Git"],
      Browsers: ["Chrome", "Edge", "Firefox", "Safari"],
      npmPackages: [
        "vuepress",
        "@vuepress/core",
        "@vuepress/theme-default",
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
