# @condorhero/vuepress-plugin-export-pdf-v2

> If you are using `VuePress1.x`, please use [vuepress-plugin-export-pdf](https://github.com/condorheroblog/vuepress-plugin/blob/main/packages/vuepress-plugin-export-pdf/README.md)

`@condorhero/vuepress-plugin-export-pdf-v2` is a VuePress plugin that allows you to export your sites to a PDF file.

<p align="center">
    <a href="https://www.npmjs.com/package/@condorhero/vuepress-plugin-export-pdf-v2" target="__blank">
        <img src="https://img.shields.io/npm/v/@condorhero/vuepress-plugin-export-pdf-v2.svg?color=a1b858" alt="NPM version">
    </a>
    <a href="https://www.npmjs.com/package/@condorhero/vuepress-plugin-export-pdf-v2" target="__blank">
        <img alt="NPM Downloads" src="https://img.shields.io/npm/dm/@condorhero/vuepress-plugin-export-pdf-v2.svg?color=50a36f">
    </a>
    <br />
</p>

> Inspired by [vuepress-plugin-export](https://github.com/ulivz/vuepress-plugin-export) and [vuepress-plugin-pdf-export](https://github.com/SnowdogApps/vuepress-plugin-pdf-export)

## Installation

```sh
npm install @condorhero/vuepress-plugin-export-pdf-v2 -D
```
then add script to your `package.json`:

```json
{
  "scripts": {
    "export-pdf": "press-export-pdf export [path/to/your/docs]"
  }
}
```

Then run:

```sh
npm run export-pdf
```
## Usage

### press-export-pdf

The package provides the `press-export-pdf` command with the following command line options:

![vuepress-plugin-export-pdf-v2.png](./assets/vuepress-plugin-export-pdf-v2.png)

- `export [sourceDir]`: Export your site to a PDF file
  - `-c, --config <config>`: Set path to config file
  - `--outFile <outFile>`: Name of output file
  - `--outDir <outDir>`: Directory of output files
  - `--debug`: Enable debug mode
- `info`: Display environment information
- `--help`: Display help information
- `--version`: Display version information

## Config options

You can create a new config file, we support the following files:

- `vuepress-pdf.config.ts`
- `vuepress-pdf.config.js`
- `vuepress-pdf.config.cjs`
- `vuepress-pdf.config.mjs`
- `.vuepress/vuepress-pdf.config.ts`
- `.vuepress/vuepress-pdf.config.js`
- `.vuepress/vuepress-pdf.config.cjs`
- `.vuepress/vuepress-pdf.config.mjs`

In addition, you can also customize the configuration file through `--config` or `-c`.

It is recommended to use TS(`.vuepress/vuepress-pdf.config.ts`) files, which are easy to manage and have **friendly code prompts**.

ex:

```ts
// .vuepress/vuepress-pdf.config.ts
import { defineUserConfig } from "@condorhero/vuepress-plugin-export-pdf-v2";

export default defineUserConfig({
  theme: "@vuepress/theme-default",
});
```

config options:

- `theme` - theme name (default `@vuepress/default`)
- `bundler` - VuePress bundler name (default `vuepress-vite`)
- `sorter` - function for changing pages order (default `undefined`)
- `outFile` - name of output file (default `vuepress-YYMMDD-HHmmss.pdf`)
- `outDir` - Directory of output files (default `package.json` file exists in directory)
- `puppeteerLaunchOptions` - [Puppeteer launch options object](https://github.com/puppeteer/puppeteer/blob/main/docs/api/puppeteer.puppeteerlaunchoptions.md)
- `pdfOptions` - [Valid options to configure PDF generation via Page.pdf()](https://github.com/puppeteer/puppeteer/blob/main/docs/api/puppeteer.pdfoptions.md) (default `{ format: 'A4 }`)

## PDF print style

By default, `A4` paper is used for printing, The size of A4 paper is (8.27in x 11.7in), One inch is equal to ninety-six pixels: `1 in = 96 pixel (X)` ,the inch unit of A4 is converted to (793.92px x 1123.2px).

The layout of VuePress itself is responsive, which should meet your needs. If you change the size of the printing paper or don't want some styles on the website to be input into PDF, you need to simply write some CSS styles.

It is recommended that you change it in the [global style](https://v2.vuepress.vuejs.org/reference/default-theme/styles.html) of VuePress(`.vuepress/styles/index.scss`), use the `print` of `@media` to control CSS style.

for example:

```styl
@media print {
  .navbar,
  .sidebar,
  .sidebar-mask,
  .page-edit,
  .page-nav {
    display: none;
  }
}
```

![print-style.png](./assets/print-style.png)

## Contributing

1. Fork it!
2. Create your feature branch: git checkout -b my-new-feature
3. Commit your changes: git commit -am 'Add some feature'
4. Push to the branch: git push origin my-new-feature
5. Submit a pull request :D

## Report Bug

run `vuepress info` or `press-export-pdf info` Shows debugging information about the local environment.

## License

[MIT](https://github.com/condorheroblog/vuepress-plugin/blob/main/LICENSE)