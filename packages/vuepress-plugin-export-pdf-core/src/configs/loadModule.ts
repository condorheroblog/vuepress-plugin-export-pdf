import { bundleRequire } from "bundle-require";

/**
 * loadModule is a function that loads the user config.
 * @param configPath path to user config file
 * @returns config - UserConfig
 */
export const loadModule = async<T>(configPath: string): Promise<T> => {
	const { mod } = await bundleRequire({
		filepath: configPath,
	});

	return mod.default || mod;
};
