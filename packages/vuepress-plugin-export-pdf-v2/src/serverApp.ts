import { join } from "node:path";
import { createDevApp, defaultTheme, viteBundler } from "vuepress";
import debug from "debug";
import type { CommandOptions } from "@condorhero/vuepress-plugin-export-pdf-core";
import { checkEnv, generatePdf, loadModule, resolveUserConfigConventionalPath, resolveUserConfigPath, timeTransformer } from "@condorhero/vuepress-plugin-export-pdf-core";

import pkg from "../package.json";
import type { UserConfig } from ".";

const devDebug = debug("vuepress-plugin-export-pdf-v2:dev-server");

export const serverApp = async (dir = "docs", commandOptions: CommandOptions = {}) => {
	const sourceDir = join(process.cwd(), dir);

	if (commandOptions.debug)
		debug.enabled("vuepress-plugin-export-pdf-v2:*");

	devDebug("sourceDir: %s", sourceDir);

	let userConfig: UserConfig = {};

	// resolve user config file
	const userConfigPath = commandOptions.config
		? resolveUserConfigPath(commandOptions.config)
		: resolveUserConfigConventionalPath(sourceDir);

	// get user config data
	if (userConfigPath)
		userConfig = await loadModule<UserConfig>(userConfigPath);

	// set default routePatterns
	if (Array.isArray(userConfig.routePatterns))
		userConfig.routePatterns = ["/**", "!/404.html", ...userConfig.routePatterns];
	else
		userConfig.routePatterns = ["/**", "!/404.html"];

	const vuepressOutFile = commandOptions.outFile ?? `vuepress-${timeTransformer()}.pdf`;
	const vuepressOutDir = commandOptions.outDir ?? ".";

	devDebug("userConfig: %O", userConfig);

	const {
		theme = defaultTheme(),
		bundler = viteBundler(),
		sorter,
		puppeteerLaunchOptions,
		pdfOptions,
		pdfOutlines = commandOptions.pdfOutlines,
		outFile = vuepressOutFile,
		outDir = vuepressOutDir,
		routePatterns,
	} = userConfig;

	const devApp = createDevApp({
		source: sourceDir,
		bundler,
		theme,
		host: "localhost",
		port: 8714,
	});
	checkEnv(pkg.engines.node, devApp.version, pkg.peerDependencies.vuepress);

	// initialize and prepare
	await devApp.init();
	await devApp.prepare();

	// start dev server
	const closeDevServer = await devApp.dev();

	process.stdout.write("Start to generate current site to PDF ...");

	const { pages, options: { temp: tempPath } } = devApp;
	try {
		await generatePdf({
			pages,
			tempDir: tempPath,
			port: devApp.options.port,
			host: devApp.options.host,
			outFile,
			outDir,
			sorter,
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
	closeDevServer();
	process.exit(0);
};
