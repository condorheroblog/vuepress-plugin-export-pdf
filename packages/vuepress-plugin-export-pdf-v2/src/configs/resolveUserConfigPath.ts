import { chalk, fs, logger, path } from "@vuepress/utils";

/**
 * Resolve file path of user config
 */
export const resolveUserConfigPath = (
  userConfigPath: string,
  cwd = process.cwd(),
): string => {
  const configPath = path.resolve(cwd, userConfigPath);

  if (!fs.pathExistsSync(configPath)) {
    throw logger.error(
      `config file does not exist: ${chalk.magenta(userConfigPath)}`,
    );
  }

  return configPath;
};
