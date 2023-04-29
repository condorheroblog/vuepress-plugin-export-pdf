import type { CAC } from "@condorhero/vuepress-plugin-export-pdf-core";

import { registerCommands } from "./commands";
import type { UserConfig } from ".";

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
