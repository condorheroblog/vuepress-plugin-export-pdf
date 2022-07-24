/**
 * Module dependencies.
 */

import { logger } from "@vuepress/utils";
import semver from "semver";
import pkg from "../../package.json";

/**
 * Check if Node version meets VuePress requirement and Vuepress meets plugin VuePress.
 */

export function checkEnv(nodeVersion: string, vuePressVersion: string) {
  if (!semver.satisfies(process.version, nodeVersion, { includePrerelease: true })) {
    logger.error(
      "\n[vuepress] minimum Node version not met:"
      + `\nYou are using Node ${process.version}, but VuePress `
      + `requires Node ${nodeVersion}.\nPlease upgrade your Node version.\n`,
    );
    process.exit(1);
  }

  if (!semver.satisfies(vuePressVersion, pkg.peerDependencies.vuepress, { includePrerelease: true })) {
    logger.error(
      "\n[vuepress] VuePress version not met:"
      + `\nYou are using VuePress ${vuePressVersion}, but plugin `
      + `requires ${pkg.peerDependencies.vuepress}.\nPlease check it.\n`,
    );
    process.exit(1);
  }
}
