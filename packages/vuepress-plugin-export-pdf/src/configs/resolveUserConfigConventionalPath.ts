import { fs, path } from "@vuepress/utils";

/**
 * Resolve conventional user config file path
 */
export const resolveUserConfigConventionalPath = (
	source: string,
	cwd = process.cwd(),
) =>
	[
		path.resolve(cwd, "vuepress-pdf.config.ts"),
		path.resolve(cwd, "vuepress-pdf.config.js"),
		path.resolve(cwd, "vuepress-pdf.config.cjs"),
		path.resolve(cwd, "vuepress-pdf.config.mjs"),
		path.resolve(source, ".vuepress/vuepress-pdf.config.ts"),
		path.resolve(source, ".vuepress/vuepress-pdf.config.js"),
		path.resolve(source, ".vuepress/vuepress-pdf.config.cjs"),
		path.resolve(source, ".vuepress/vuepress-pdf.config.mjs"),
	].find(item => fs.pathExistsSync(item));
