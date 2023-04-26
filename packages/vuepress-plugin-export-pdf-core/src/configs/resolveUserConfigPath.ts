import { resolve } from "node:path";
import pc from "picocolors";
import fse from "fs-extra";

/**
 * Resolve file path of user config
 */
export const resolveUserConfigPath = (
	userConfigPath: string,
	cwd = process.cwd(),
): string => {
	const configPath = resolve(cwd, userConfigPath);

	if (!fse.pathExistsSync(configPath)) {
		throw console.error(
      `config file does not exist: ${pc.magenta(userConfigPath)}`,
		);
	}

	return configPath;
};
