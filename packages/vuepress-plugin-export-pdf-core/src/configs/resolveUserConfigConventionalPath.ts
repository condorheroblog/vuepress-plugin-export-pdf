import { resolve } from "node:path";
import fse from "fs-extra";

/**
 * Resolve conventional user config file path
 */
export const resolveUserConfigConventionalPath = (
	source: string,
	configName = "vuepress",
	cwd = process.cwd(),
) =>
	[
		resolve(cwd, `${configName}-pdf.config.ts`),
		resolve(cwd, `${configName}-pdf.config.js`),
		resolve(cwd, `${configName}-pdf.config.cjs`),
		resolve(cwd, `${configName}-pdf.config.mjs`),
		resolve(source, `.${configName}/${configName}-pdf.config.ts`),
		resolve(source, `.${configName}/${configName}-pdf.config.js`),
		resolve(source, `.${configName}/${configName}-pdf.config.cjs`),
		resolve(source, `.${configName}/${configName}-pdf.config.mjs`),
	].find(item => fse.pathExistsSync(item));
