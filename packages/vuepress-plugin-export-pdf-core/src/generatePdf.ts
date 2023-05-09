import { join } from "node:path";
import fse from "fs-extra";
import pc from "picocolors";
import { Printer, createProgress, isValidUrl, writeFileSafe } from "html-export-pdf-cli";
import type { LaunchOptions, PDFOptions } from "html-export-pdf-cli";

import { filterRoute } from "./utils";
import type { Page } from ".";
import { mergePDF } from ".";

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
	pdfOutlines?: boolean
	urlOrigin?: string
	outlineContainerSelector?: string
}

/**
 * Generate PDF from VuePress or VitePress dev server.
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
	urlOrigin,
	pdfOptions,
	pdfOutlines,
	routePatterns,
	puppeteerLaunchOptions,
	outlineContainerSelector,
	// eslint-disable-next-line sonarjs/cognitive-complexity
}: IGeneratePdfOptions) => {
	const tempPdfDir = join(tempDir, "pdf");
	fse.ensureDirSync(tempPdfDir);

	let exportPages = filterRoute(pages, routePatterns);

	if (typeof sorter === "function")
		exportPages = exportPages.sort(sorter);

	const isValidUrlOrigin = isValidUrl(urlOrigin ?? "");
	if (urlOrigin && !isValidUrlOrigin) {
		process.stdout.write(pc.red(`${urlOrigin} is not a valid URL`));
		process.exit(1);
	}
	let userURLOrigin = "";
	if (urlOrigin && isValidUrlOrigin)
		userURLOrigin = new URL(urlOrigin).origin;

	const localURLOrigin = `${host}:${port}`;

	const normalizePages = exportPages.map((page) => {
		return {
			url: page.path,
			title: page.title,
			location: urlOrigin ? `${userURLOrigin}${page.path}` : `http://${localURLOrigin}${page.path}`,
			pagePath: `${tempPdfDir}/${page.key}.pdf`,
		};
	});

	const singleBar = createProgress();
	singleBar.start(normalizePages.length);

	const printer = new Printer({ outlineContainerSelector });
	await printer.setup(puppeteerLaunchOptions);

	for (const { location, pagePath, title } of normalizePages) {
		const page = await printer.createNewPage(location);

		if (urlOrigin && isValidUrlOrigin) {
			await page.setRequestInterception(true);
			page.on("request", (request) => {
				const reqUrl = request.url();
				// http or https
				if (isValidUrl(reqUrl)) {
					const parsedUrl = new URL(reqUrl);
					if (userURLOrigin === parsedUrl.origin) {
						parsedUrl.host = host;
						parsedUrl.protocol = "http:";
						parsedUrl.port = `${port}`;
						const parsedUrlString = parsedUrl.toString();
						request.continue({
							url: parsedUrlString,
							headers: Object.assign(
								{},
								request.headers(),
								{
									refer: parsedUrlString,
								// Same origin
								// origin: parsedUrl.origin,
								// CORS
								// host: parsedUrl.host,
								}),
						});
					}
					else {
						request.continue();
					}
				}
				else {
					request.continue();
				}
			});
		}

		await printer.render(location);
		const headTitle = title || await page.title();
		const data = await printer.pdf(location, {
			format: "A4",
			...pdfOptions,
		});
		await writeFileSafe(pagePath, data);

		await printer.closePage(location);
		singleBar.increment(1, { headTitle });
	}

	singleBar.stop();
	await printer.closeBrowser();

	const exportedPath = await mergePDF(normalizePages, outFile, outDir, pdfOutlines);
	const message = `\nExported to ${pc.yellow(exportedPath)}\n`;
	process.stdout.write(message);

	fse.removeSync(tempPdfDir);
	!fse.readdirSync(tempDir).length && fse.removeSync(tempDir);
	return exportedPath;
};
