import { join, relative } from "node:path";
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
 * @returns relativePath - Output relative path
 */
export const mergePDF = async (pages: IPage[], outFile: string, outDir: string) => {
	const saveDirPath = join(process.cwd(), outDir);
	outDir && fse.ensureDirSync(saveDirPath);
	const saveFilePath = join(saveDirPath, outFile);

	if (pages.length === 1) {
		fse.moveSync(pages[0].pagePath, saveFilePath, { overwrite: true });
	}
	else {
		const mergedPdf = new pdf.Document();

		pages
			.map(({ pagePath }) => fse.readFileSync(pagePath))
			.forEach((file) => {
				const page = new pdf.ExternalDocument(file);
				mergedPdf.addPagesOf(page);
			});

		const pdfData = await mergedPdf.asBuffer();
		fse.writeFileSync(saveFilePath, pdfData, { encoding: "binary" });
	}

	return relative(process.cwd(), saveFilePath);
};
