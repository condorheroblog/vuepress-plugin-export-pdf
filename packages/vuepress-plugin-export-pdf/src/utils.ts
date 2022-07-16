import { chalk } from "@vuepress/utils";

/**
 * Wrap raw command to catch errors and exit process
 */
export const wrapCommand = (cmd: (...args: any[]) => Promise<void>): typeof cmd => {
  const wrappedCommand: typeof cmd = (...args) =>
    cmd(...args).catch((err) => {
      console.error(chalk.red(err.stack));
      process.exit(1);
    });
  return wrappedCommand;
};

export function timerTransformer(timestamp = new Date(), lang = "cn", dateOptions = {}) {
  return new Date(timestamp).toLocaleString(lang, dateOptions).replaceAll(/(\/|\:|)/g, "").replace("\s", "-");
}
