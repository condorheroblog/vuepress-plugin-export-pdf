import { resolve } from 'node:path'
import process from 'node:process'
import fse from 'fs-extra'

/**
 * Resolve conventional user config file path
 */
export function resolveUserConfigConventionalPath(source: string, configName = 'vuepress', cwd = process.cwd()) {
  return [
    resolve(cwd, `${configName}-pdf.config.ts`),
    resolve(cwd, `${configName}-pdf.config.js`),
    resolve(cwd, `${configName}-pdf.config.cjs`),
    resolve(cwd, `${configName}-pdf.config.mjs`),
    resolve(source, `.${configName}/${configName}-pdf.config.ts`),
    resolve(source, `.${configName}/${configName}-pdf.config.js`),
    resolve(source, `.${configName}/${configName}-pdf.config.cjs`),
    resolve(source, `.${configName}/${configName}-pdf.config.mjs`),
  ].find(item => fse.pathExistsSync(item))
}
