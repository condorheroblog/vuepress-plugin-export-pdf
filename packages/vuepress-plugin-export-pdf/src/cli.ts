import { cac } from "cac";
import { version } from "../package.json";

export const pressExportPdf = async() => {
  // create cac instance
  const program = cac("press-export-pdf");

  // display cli version
  program.version(`press-export-pdf@${version}`);

  // display help message
  program.help();

  // register `export` command
  program
    .command("export [sourceDir]", "Export current vuepress site to a PDF file(default: docs)")
    .allowUnknownOptions()
    .option("-c, --config <config>", "Set path to config file")
    .action((files, options) => {
      console.log(files, options);
    });

  const parseResult = program.parse(process.argv);
  console.log(parseResult);
};
