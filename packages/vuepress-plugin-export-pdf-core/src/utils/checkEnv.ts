/**
 * Module dependencies.
 */

import semver from "semver";

/**
 * Check if Node version meets VuePress requirement and Vuepress meets plugin VuePress.
 */

export function checkEnv(nodeVersion: string, appVersion: string, peerVersion: string) {
	if (!semver.satisfies(process.version, nodeVersion, { includePrerelease: true })) {
		console.error(
			"\n[vuepress] minimum Node version not met:"
      + `\nYou are using Node ${process.version}, but VuePress `
      + `requires Node ${nodeVersion}.\nPlease upgrade your Node version.\n`,
		);
		process.exit(1);
	}

	if (!semver.satisfies(appVersion, peerVersion, { includePrerelease: true })) {
		console.error(
			"\n[vuepress] VuePress version not met:"
      + `\nYou are using VuePress ${appVersion}, but plugin `
      + `requires ${peerVersion}.\nPlease check it.\n`,
		);
		process.exit(1);
	}
}
