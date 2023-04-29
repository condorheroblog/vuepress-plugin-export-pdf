import pc from "picocolors";
import envinfo from "envinfo";
import ora from "ora";

/**
 * Display environment information.
 */
export const systemInfo = async (message: string[]) => {
	const spinner = ora();
	spinner.start(pc.bold("\nCollecting Environment Info:"));

	const result = await envinfo.run(
		{
			System: ["OS", "CPU", "Memory", "Shell"],
			Binaries: ["Node", "Yarn", "npm"],
			Utilities: ["Git"],
			Browsers: ["Chrome", "Edge", "Firefox", "Safari"],
			npmPackages: message,
		},
		{
			showNotFound: true,
			duplicates: true,
			fullTree: true,
		},
	);
	spinner.stop();

	process.stdout.write(result);
	return result;
};
