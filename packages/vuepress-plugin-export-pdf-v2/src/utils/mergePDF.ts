import { chalk, fs, logger, path } from "@vuepress/utils";
import pdf from "pdfjs";

const { yellow } = chalk;

interface IPage {
  location: string
  pagePath: string
  url: string
  title: string
}

/**
 * Merge PDFs.
 * @param pages - Pages
 * @param outFile - Output file
 * @param outDir - Output directory
 */
export const mergePDF = async(pages: IPage[], outFile: string, outDir: string) => {
  await new Promise((resolve) => {
    const mergedPdf = new pdf.Document();

    pages
      .map(({ pagePath }) => fs.readFileSync(pagePath))
      .forEach((file) => {
        const page = new pdf.ExternalDocument(file);
        mergedPdf.addPagesOf(page);
      });

    mergedPdf.asBuffer((err, data) => {
      if (err) {
        throw err;
      }
      else {
        const saveDirPath = path.join(process.cwd(), outDir);
        outDir && fs.ensureDirSync(saveDirPath);
        const saveFilePath = path.join(saveDirPath, outFile);
        fs.writeFileSync(saveFilePath, data, { encoding: "binary" });
        logger.success(`Export ${yellow(saveFilePath)} file!`);
        resolve(true);
      }
    });
  });
};
