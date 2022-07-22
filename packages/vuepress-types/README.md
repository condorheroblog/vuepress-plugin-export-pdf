# @condorhero/vuepress-types

> VuePress TypeScript helpers for **1.x**, fork [vuepress-types](https://github.com/vuepress/vuepress-community/blob/main/packages/vuepress-types/README.md)

## Usage

Go to [VuePress Community](https://github.com/vuepress) and open the document of [vuepress-types](https://vuepress-community.netlify.app/en/tools/types/#installation).



But chapter [Add it to tsconfig](https://vuepress-community.netlify.app/en/tools/types/#import-it-manually) is wrong, Now the `types` option of TypeScript is not used to specify the declaration file, but only to load the declaration package in the `typeroots` (default `@types`) directory.

### Types

By default all visible `”@types”` packages are included in your compilation. Packages in `node_modules/@types` of any enclosing folder are considered visible. For example, that means packages within `./node_modules/@types/`, `../node_modules/@types/`, `../../node_modules/@types/`, and so on.

If types is specified, only packages listed will be included in the global scope. For instance:

```json
{
  "compilerOptions": {
    "types": ["node", "jest", "express"]
  }
}
```

This tsconfig.json file will only include `./node_modules/@types/node`, `./node_modules/@types/jest` and `./node_modules/@types/express`. Other packages under `node_modules/@types/*` will not be included.

What does this affect?

This option does not affect how `@types/*` are included in your application code, for example if you had the above compilerOptions example with code like:

```js
import * as moment from "moment";
moment().format("MMMM Do YYYY, h:mm:ss a");
```

The moment import would be fully typed.

When you have this option set, by not including a module in the types array it:

- Will not add globals to your project (e.g process in node, or expect in Jest)
- Will not have exports appear as auto-import recommendations

This feature differs from typeRoots in that it is about specifying only the exact types you want included, whereas typeRoots supports saying you want particular folders.

## License

[MIT](https://github.com/condorheroblog/vuepress-plugin/blob/main/LICENSE)
