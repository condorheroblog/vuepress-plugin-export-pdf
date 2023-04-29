/**
* press-export-pdf cli
*/

import type { CAC } from "@condorhero/vuepress-plugin-export-pdf-core";
import { runCli, systemInfo } from "@condorhero/vuepress-plugin-export-pdf-core";
import { serverApp } from ".";
import type { UserConfig } from ".";

export const registerCommands = (program: CAC, extendCliConfig?: UserConfig) => {
	// register `export` command
	program
		.command("export [sourceDir]", "Export current VuePress site to a PDF file(default: docs)")
		.allowUnknownOptions()
		.option("-c, --config <config>", "Set path to config file")
		.option("--pdfOutlines <pdfOutlines>", "Keep PDF outlines/bookmarks")
		.option("--theme <theme>", "Set VuePress theme")
		.option("--outFile <outFile>", "Name of output file")
		.option("--outDir <outDir>", "Directory of output files")
		.option("--urlOrigin <urlOrigin>", "Change the origin of the print url")
		.option("--debug", "Enable debug mode")
		.action((file: string, config: Record<string, string>) => {
			serverApp(file, extendCliConfig ?? config);
		});

	// register `info` command
	program
		.command("info", "Display environment information")
		.action(() => {
			systemInfo([
				"vuepress",
				"@vuepress/core",
				"@vuepress/theme-default",
			]);
		});
};

runCli("press-export-pdf")(registerCommands);
