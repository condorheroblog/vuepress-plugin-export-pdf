import { version } from "vuepress";
import { checkEnv } from "../utils";
import pkg from "../../package.json";
import { vuePressServer } from "./vuePressServer";

export const serverApp = (...args: any[]) => {
  checkEnv(pkg.engines.node, version);
  return vuePressServer(...args);
};
