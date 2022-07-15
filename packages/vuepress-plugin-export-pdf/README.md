# @condorhero/vuepress-plugin-export-pdf

`@condorhero/vuepress-plugin-export-pdf` is a VuePress plugin that allows you to export your sites to a PDF file.

<p align="center">
    <a href="https://www.npmjs.com/package/@condorhero/vuepress-plugin-export-pdf" target="__blank">
        <img src="https://img.shields.io/npm/v/@condorhero/vuepress-plugin-export-pdf.svg?color=a1b858" alt="NPM version">
    </a>
    <a href="https://www.npmjs.com/package/@condorhero/vuepress-plugin-export-pdf" target="__blank">
        <img alt="NPM Downloads" src="https://img.shields.io/npm/dm/@condorhero/vuepress-plugin-export-pdf.svg?color=50a36f">
    </a>
    <a href="https://packagephobia.now.sh/result?p=@condorhero/vuepress-plugin-export-pdf" target="__blank">
        <img alt="install size" src="https://badgen.net/packagephobia/install/@condorhero/vuepress-plugin-export-pdf">
    </a>
    <br />
</p>

> Inspired by [vuepress-plugin-export](https://github.com/ulivz/vuepress-plugin-export) and [vuepress-plugin-pdf-export](https://github.com/SnowdogApps/vuepress-plugin-pdf-export)

## Installation

```sh
npm install @condorhero/vuepress-plugin-export-pdf
```
then add script to your `package.json`:

```json
{
  "scripts": {
    "export-pdf": "press-plugin-export-pdf export [path/to/your/docs]"
  }
}
```

Then run:

```sh
npm run export-pdf
```
## Usage

There are four command lines included:

![vuepress-plugin-export-pdf.png](./assets/vuepress-plugin-export-pdf.png)

- `export [sourceDir]`: Export your site to a PDF file
- `-c, --config <config>`: Set path to config file
- `info`: Display environment information
- `version`: Display version information
- `help`: Display help information
- `--debug`: Enable debug mode

## Contributing

1. Fork it!
2. Create your feature branch: git checkout -b my-new-feature
3. Commit your changes: git commit -am 'Add some feature'
4. Push to the branch: git push origin my-new-feature
5. Submit a pull request :D

## License

[MIT](https://github.com/condorheroblog/vuepress-plugin/blob/main/LICENSE)
