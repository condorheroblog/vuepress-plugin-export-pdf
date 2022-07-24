import { defineBuildConfig } from "unbuild";
import fg from "fast-glob";

export default defineBuildConfig({
  entries: [
    ...fg.sync("src/commands/*.ts").map(i => i.slice(0, -3)),
  ],
  externals: ["vuepress"],
  clean: true,
  declaration: true,
  rollup: {
    emitCJS: true,
    inlineDependencies: true,
  },
});
