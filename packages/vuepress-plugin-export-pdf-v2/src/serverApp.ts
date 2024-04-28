import { join } from 'node:path'
import process from 'node:process'
import { createRequire } from 'node:module'
import {
  createDevApp,
  loadUserConfig,
  resolveUserConfigConventionalPath as resolveVuePressConfig,
  transformUserConfigToPlugin,
} from 'vuepress'
import debug from 'debug'
import type { CommandOptions } from '@condorhero/vuepress-plugin-export-pdf-core'
import {
  checkEnv,
  generatePdf,
  loadModule,
  resolveUserConfigConventionalPath,
  resolveUserConfigPath,
  timeTransformer,
} from '@condorhero/vuepress-plugin-export-pdf-core'

import pkg from '../package.json'
import type { UserConfig } from '.'

const devDebug = debug('vuepress-plugin-export-pdf-v2:dev-server')

export const moduleRequire = createRequire(import.meta.url)
const { version } = moduleRequire('vuepress/package.json')

export async function serverApp(dir = 'docs', commandOptions: CommandOptions = {}) {
  checkEnv('VuePress', pkg.engines.node, version, pkg.peerDependencies.vuepress)
  const sourceDir = join(process.cwd(), dir)

  if (commandOptions.debug)
    debug.enabled('vuepress-plugin-export-pdf-v2:*')

  devDebug('sourceDir: %s', sourceDir)

  let userConfig: UserConfig = {}

  // resolve user config file
  const userConfigPath = commandOptions.config
    ? resolveUserConfigPath(commandOptions.config)
    : resolveUserConfigConventionalPath(sourceDir)

  // get user config data
  if (userConfigPath)
    userConfig = await loadModule<UserConfig>(userConfigPath)

  // set default routePatterns
  if (Array.isArray(userConfig.routePatterns))
    userConfig.routePatterns = ['/**', '!/404.html', ...userConfig.routePatterns]
  else
    userConfig.routePatterns = ['/**', '!/404.html']

  const vuepressOutFile = commandOptions.outFile ?? `vuepress-${timeTransformer()}.pdf`
  const vuepressOutDir = commandOptions.outDir ?? '.'

  devDebug('userConfig: %O', userConfig)

  const {
    theme,
    bundler,
    sorter,
    puppeteerLaunchOptions,
    pdfOptions,
    routePatterns,
    outFile = vuepressOutFile,
    outDir = vuepressOutDir,
    urlOrigin = commandOptions.urlOrigin,
    pdfOutlines = commandOptions.pdfOutlines,
    outlineContainerSelector,
  } = userConfig

  const { userConfig: vuePressConfig } = await loadUserConfig(resolveVuePressConfig(sourceDir))

  const siteBundler = bundler || vuePressConfig.bundler
  const siteTheme = theme || vuePressConfig.theme
  // TODO 测试
  if (siteBundler === undefined || siteTheme === undefined) {
    process.stdout.write('error The bundler or theme option is missing. For more details: https://v2.vuepress.vuejs.org/guide/troubleshooting.html#the-bundler-theme-option-is-missing')
    process.exit(0)
  }

  const devApp = createDevApp({
    source: sourceDir,
    ...vuePressConfig,
    bundler: siteBundler,
    theme: siteTheme,
    host: 'localhost',
    port: 8714,
  })

  // use user-config plugin
  devApp.use(transformUserConfigToPlugin(userConfig, sourceDir))

  // initialize and prepare
  await devApp.init()
  await devApp.prepare()

  // start dev server
  const closeDevServer = await devApp.dev()

  process.stdout.write('Start to generate current site to PDF ...')

  const { pages, options: { temp: tempPath } } = devApp
  const hashPages = pages.map(page => ({
    // join => /docs//zh/
    path: join(`${devApp.siteData.base}${page.path}`),
    // TODO
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    key: page.key,
  }))
  try {
    await generatePdf({
      pages: hashPages,
      tempDir: tempPath,
      port: devApp.options.port,
      host: devApp.options.host,
      outFile,
      outDir,
      sorter,
      urlOrigin,
      pdfOptions,
      pdfOutlines,
      routePatterns,
      puppeteerLaunchOptions,
      outlineContainerSelector,
    })
  }
  catch (error) {
    console.error(error)
  }

  // close current dev server
  await closeDevServer()
  process.exit(0)
}
