import { join } from "node:path";
import fse from "fs-extra";
import { Printer, createProgress, writeFileSafe } from "html-export-pdf-cli";
import type { LaunchOptions, PDFOptions } from "html-export-pdf-cli";

import { filterRoute } from "../utils";
import type { Page } from "../";
import { mergePDF } from "./mergePDF";

export type UserSorter = (a: Page, b: Page) => number;

export interface IGeneratePdfOptions {
	pages: Page[]
	tempDir: string
	port: number
	host: string
	outFile: string
	outDir: string
	routePatterns: string[]
	sorter?: UserSorter
	puppeteerLaunchOptions?: LaunchOptions
	pdfOptions?: PDFOptions
}

/**
 * Generate PDF from VuePress dev server.
 * @param param1 - IGeneratePdfOptions
 */
export const generatePdf = async ({
	pages,
	tempDir,
	port,
	host,
	sorter,
	outFile,
	outDir,
	puppeteerLaunchOptions,
	pdfOptions,
	routePatterns,
}: IGeneratePdfOptions) => {
	const tempPdfDir = join(tempDir, "pdf");
	fse.ensureDirSync(tempPdfDir);

	let exportPages = filterRoute(pages, routePatterns);

	if (typeof sorter === "function")
		exportPages = exportPages.sort(sorter);

	const normalizePages = exportPages.map((page) => {
		return {
			url: page.path,
			title: page.title,
			location: `http://${host}:${port}${page.path}`,
			pagePath: `${tempPdfDir}/${page.key}.pdf`,
		};
	});

	const singleBar = createProgress();
	singleBar.start(normalizePages.length);

	const printer = new Printer(puppeteerLaunchOptions);

	for (const { location, pagePath, title } of normalizePages) {
		const data = await printer.pdf(location, {
			format: "A4",
			...pdfOptions,
		});
		await writeFileSafe(pagePath, data);

		singleBar.increment(1);
		singleBar.updateText(title);
	}

	singleBar.stop();
	await printer.close();
	await mergePDF(normalizePages, outFile, outDir);

	fse.removeSync(tempPdfDir);
	!fse.readdirSync(tempDir).length && fse.removeSync(tempDir);
};
