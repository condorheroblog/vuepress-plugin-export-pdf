import { join, relative } from 'node:path'
import type { Buffer } from 'node:buffer'
import process from 'node:process'
import fse from 'fs-extra'
import { mergePDFs } from '@condorhero/merge-pdfs'
import pc from 'picocolors'
import pdf from 'pdfjs'
import { convertPathToPosix } from './convertPathToPosix'

export interface NormalizePage {
  location: string
  pagePath: string
  url: string
  title?: string
}

/**
 * Merge PDFs.
 * @param pages - NormalizePage
 * @param outFile - Output file
 * @param outDir - Output directory
 * @returns relativePath - Output relative path
 */
export async function mergePDF(pages: NormalizePage[], outFile: string, outDir: string, pdfOutlines = true) {
  const saveDirPath = join(process.cwd(), outDir)
  outDir && fse.ensureDirSync(saveDirPath)
  const saveFilePath = join(saveDirPath, outFile)

  if (pages.length === 0) {
    process.stdout.write(pc.red('The website has no pages, please check whether the export path is set correctly'))
    process.exit(1)
  }
  else if (pages.length === 1) {
    fse.moveSync(pages[0].pagePath, saveFilePath, { overwrite: true })
  }
  else {
    let pdfData: Buffer
    if (pdfOutlines) {
      pdfData = await mergePDFs(pages.map(({ pagePath }) => {
        const relativePagePath = relative(process.cwd(), pagePath)
        return convertPathToPosix(relativePagePath)
      }))
    }
    else {
      const doc = new pdf.Document()

      pages
        .map(({ pagePath }) => fse.readFileSync(pagePath))
        .forEach((pdfFileItem) => {
          const pageFile = new pdf.ExternalDocument(pdfFileItem)
          doc.addPagesOf(pageFile)
        })

      pdfData = await doc.asBuffer()
    }

    fse.writeFileSync(saveFilePath, pdfData, { encoding: 'binary' })
  }

  return relative(process.cwd(), saveFilePath)
}
