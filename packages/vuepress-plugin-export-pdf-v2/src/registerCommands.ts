import type { CAC } from "cac";

import { serverApp } from "./dev-server";
import { systemInfo } from "./systemInfo";
import { wrapCommand } from "./utils";

/**
 * registerCommands
 * @param program - CAC
 */
export const registerCommands = (program: CAC) => {
  // register `export` command
  program
    .command("export [sourceDir]", "Export current vuepress site to a PDF file(default: docs)")
    .allowUnknownOptions()
    .option("-c, --config <config>", "Set path to config file")
    .option("--outFile <outFile>", "Name of output file")
    .option("--outDir <outDir>", "Directory of output files")
    .option("--debug", "Enable debug mode")
    .action(wrapCommand(serverApp));

  // register `info` command
  program
    .command("info", "Display environment information")
    .action(wrapCommand(systemInfo));
};
