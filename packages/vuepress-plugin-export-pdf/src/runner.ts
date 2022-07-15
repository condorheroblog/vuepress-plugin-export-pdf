import type { pressExportPdf } from "./cli";

export const runCli = async(fn: typeof pressExportPdf) => {
  // const args = process.argv.slice(2).filter(Boolean);
  try {
    await fn();
  }
  catch (error) {
    process.exit(1);
  }
};
