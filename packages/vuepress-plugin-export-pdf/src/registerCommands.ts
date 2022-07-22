import type { CAC } from "cac";
import type { UserConfig } from "./configs";

import { serverApp } from "./dev-server";
import { systemInfo } from "./systemInfo";
import { wrapCommand } from "./utils";

/**
 * registerCommands
 * @param program - CAC
 * @param userConfig - User config
 */
export const registerCommands = (program: CAC, userConfig?: UserConfig) => {
  // register `export` command
  program
    .command("export [sourceDir]", "Export current vuepress site to a PDF file(default: docs)")
    .allowUnknownOptions()
    .option("-c, --config <config>", "Set path to config file")
    .option("--theme <theme>", "Set VuePress theme")
    .option("--outFile <outFile>", "Name of output file")
    .option("--outDir <outDir>", "Directory of output files")
    .option("--debug", "Enable debug mode")
    .action((file: string, config: Record<string, string>) => {
      wrapCommand(serverApp)(file, config, userConfig);
    });

  // register `info` command
  program
    .command("info", "Display environment information")
    .action(wrapCommand(systemInfo));
};
