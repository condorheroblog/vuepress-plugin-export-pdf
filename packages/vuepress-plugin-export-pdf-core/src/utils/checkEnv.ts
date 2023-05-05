/**
 * Module dependencies.
 */

import semver from "semver";

/**
 * Ensure that current Node version matches App's Node version and App's version matches peerVersion
 *
 * @param {string} appName - App's name.
 * @param {string} nodeVersion - The minimum required version of Node.
 * @param {string} appVersion - The version number of App.
 * @param {string} peerVersion - The required version number of the plugin.
 * @returns {void}
 * @throws {Error} If the environment does not meet the minimum requirements.
 */

export function checkEnv(appName = "VuePress", nodeVersion: string, appVersion: string, peerVersion: string) {
	if (!semver.satisfies(process.version, nodeVersion, { includePrerelease: true })) {
		console.error(
      `\n[${appName}] minimum Node version not met:`
      + `\nYou are using Node ${process.version}, but ${appName} `
      + `requires Node ${nodeVersion}.\nPlease upgrade your Node version.\n`,
		);
		process.exit(1);
	}

	if (!semver.satisfies(appVersion, peerVersion, { includePrerelease: true })) {
		console.error(
      `\n[${appName}] version not met:`
      + `\nYou are using ${appName} ${appVersion}, but plugin `
      + `requires ${peerVersion}.\nPlease check it.\n`,
		);
		process.exit(1);
	}
}
