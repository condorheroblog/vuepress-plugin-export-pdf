
import { join } from "node:path";
import { dev, version } from "vuepress";
import debug from "debug";
import type { CommandOptions } from "@condorhero/vuepress-plugin-export-pdf-core";
import { checkEnv, generatePdf, loadModule, resolveUserConfigConventionalPath, resolveUserConfigPath, timeTransformer } from "@condorhero/vuepress-plugin-export-pdf-core";
import pkg from "../package.json";

import type { UserConfig } from ".";

const devDebug = debug("vuepress-plugin-export-pdf:dev-server");

export interface ICommandOptions extends CommandOptions {
	theme?: string
}

export const serverApp = async (dir = "docs", commandOptions: ICommandOptions = {}) => {
	checkEnv(pkg.engines.node, version, pkg.peerDependencies.vuepress);

	const sourceDir = join(process.cwd(), dir);

	if (commandOptions.debug)
		debug.enabled("vuepress-plugin-export-pdf:*");

	devDebug("sourceDir: %s", sourceDir);

	let userConfig: UserConfig = {};

	// resolve user config file
	const userConfigPath = commandOptions.config
		? resolveUserConfigPath(commandOptions.config)
		: resolveUserConfigConventionalPath(sourceDir);

	if (userConfigPath)
		userConfig = await loadModule(userConfigPath);

	// set default routePatterns
	if (Array.isArray(userConfig.routePatterns))
		userConfig.routePatterns = ["/**", "!/404.html", ...userConfig.routePatterns];
	else
		userConfig.routePatterns = ["/**", "!/404.html"];

	const vuepressTheme = commandOptions.theme ?? "@vuepress/default";
	const vuepressOutFile = commandOptions.outFile ?? `vuepress-${timeTransformer()}.pdf`;
	const vuepressOutDir = commandOptions.outDir ?? ".";

	devDebug("userConfig: %O", userConfig);

	const {
		sorter,
		puppeteerLaunchOptions,
		pdfOptions,
		routePatterns,
		theme = vuepressTheme,
		outDir = vuepressOutDir,
		outFile = vuepressOutFile,
		urlOrigin = commandOptions.urlOrigin,
		pdfOutlines = commandOptions.pdfOutlines,
	} = userConfig;

	const devContext = await dev({
		sourceDir,
		clearScreen: false,
		theme,
	});

	await new Promise((resolve) => {
		devContext.devProcess.server.compiler.hooks.done.tap("webpack-dev-server", () => {
			process.stdout.write("VuePress dev server compiler done\n");
			resolve(true);
		});
	});

	process.stdout.write("Start to generate current site to PDF ...");

	const { pages, tempPath } = devContext;
	try {
		await generatePdf({
			pages,
			tempDir: tempPath,
			port: devContext.devProcess.port,
			/**
			 * Why not devContext.devProcess.host
			 * Because will get http://0.0.0.0:8080, and then fail
			 * @see https://github.com/vuejs/vuepress/commit/4d5c50e
			*/
			host: devContext.devProcess.displayHost,
			outFile,
			outDir,
			sorter,
			urlOrigin,
			pdfOptions,
			pdfOutlines,
			routePatterns,
			puppeteerLaunchOptions,
		});
	}
	catch (error) {
		console.error(error);
	}

	// close current dev server
	devContext.devProcess.server.close();
	process.exit(0);
};