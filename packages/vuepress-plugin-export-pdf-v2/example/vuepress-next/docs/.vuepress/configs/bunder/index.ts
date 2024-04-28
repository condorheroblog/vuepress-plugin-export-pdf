import { viteBundler } from 'vuepress'
/**
 * @see https://v2.vuepress.vuejs.org/guide/bundler.html
 */
// import { webpackBundler } from "vuepress-webpack";
// export const bundler = process.env.DOCS_BUNDLER === "webpack" ? webpackBundler() : viteBundler();

export const bundler = viteBundler()
