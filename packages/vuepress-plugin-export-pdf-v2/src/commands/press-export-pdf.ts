/**
* press-export-pdf cli
*/

import type { CAC } from "@condorhero/vuepress-plugin-export-pdf-core";
import { runCli, systemInfo } from "@condorhero/vuepress-plugin-export-pdf-core";
import { serverApp } from ".";

export const registerCommands = (program: CAC) => {
	// register `export` command
	program
		.command("export [sourceDir]", "Export current VuePress site to a PDF file(default: docs)")
		.allowUnknownOptions()
		.option("-c, --config <config>", "Set path to config file")
		.option("--outFile <outFile>", "Name of output file")
		.option("--outDir <outDir>", "Directory of output files")
		.option("--pdfOutlines <pdfOutlines>", "Keep PDF outlines/bookmarks")
		.option("--debug", "Enable debug mode")
		.action(serverApp);

	// register `info` command
	program
		.command("info", "Display environment information")
		.action(() => {
			systemInfo([
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
			]);
		});
};

runCli("press-export-pdf")(registerCommands);
