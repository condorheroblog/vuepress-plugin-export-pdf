import { chalk, logger } from "@vuepress/utils";

/**
 * Wrap raw command to catch errors and exit process
 */
export const wrapCommand = (cmd: (...args: any[]) => Promise<void>): typeof cmd => {
	const wrappedCommand: typeof cmd = (...args) =>
		cmd(...args).catch((err) => {
			logger.error(chalk.red(err.stack));
			process.exit(1);
		});
	return wrappedCommand;
};
