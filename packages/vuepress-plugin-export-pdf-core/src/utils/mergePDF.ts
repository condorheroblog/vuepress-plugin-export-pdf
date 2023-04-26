import { join, relative } from "node:path";
import pc from "picocolors";
import fse from "fs-extra";
import pdf from "pdfjs";

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
export const mergePDF = async (pages: IPage[], outFile: string, outDir: string) => {
	await new Promise((resolve) => {
		const mergedPdf = new pdf.Document();

		pages
			.map(({ pagePath }) => fse.readFileSync(pagePath))
			.forEach((file) => {
				const page = new pdf.ExternalDocument(file);
				mergedPdf.addPagesOf(page);
			});

		mergedPdf.asBuffer((err, data) => {
			if (err) {
				throw err;
			}
			else {
				const saveDirPath = join(process.cwd(), outDir);
				outDir && fse.ensureDirSync(saveDirPath);
				const saveFilePath = join(saveDirPath, outFile);
				fse.writeFileSync(saveFilePath, data, { encoding: "binary" });

				const relativePath = relative(process.cwd(), saveFilePath);
				process.stdout.write(`Export ${pc.yellow(relativePath)} file!`);
				resolve(true);
			}
		});
	});
};
