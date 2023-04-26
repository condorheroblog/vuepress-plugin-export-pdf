import type { CAC } from "cac";

import type { UserConfig } from "./configs";

import { registerCommands } from "./registerCommands";

/**
 * Extend CLI.
 * @see https://vuepress.vuejs.org/plugin/option-api.html#extendcli
 * @param userConfig - User config
 */
export function vuePressPlugin(userConfig: UserConfig) {
	return {
		extendCli: (cli: CAC) => {
			registerCommands(cli, userConfig);
		},
	};
}
