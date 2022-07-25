import cliProgress from "cli-progress";

export const singleProgressBar = (format = "Progress |" + "{bar}" + "| {percentage} % || {value} / {total}", preset = cliProgress.Presets.shades_classic) => {
  return new cliProgress.Bar({
    format,
  }, preset);
};
