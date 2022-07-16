import type { pressExportCli } from "./cli";

export const runCli = async(fn: typeof pressExportCli) => {
  try {
    await fn();
  }
  catch (error) {
    process.exit(1);
  }
};
