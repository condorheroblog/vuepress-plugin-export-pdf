export interface CommandOptions {
  config?: string
  outDir?: string
  outFile?: string
  debug?: boolean
  urlOrigin?: string
  pdfOutlines?: boolean
}

export interface Page {
  title?: string
  key: string
  path: string
}

export type { Browser, PDFOptions, LaunchOptions } from 'html-export-pdf-cli'
