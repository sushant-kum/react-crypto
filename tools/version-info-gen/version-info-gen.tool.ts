/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date May 19 2021 16:59:40 GMT+05:30
 * @modify date May 19 2021 16:59:40 GMT+05:30
 * @desc Version info generation tool
 */

/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-var-requires */

const { resolve, relative } = require("path");
const chalk = require("chalk");
const { Command } = require("commander");
const { writeFileSync } = require("fs-extra");

const { version } = require("../../package.json");

const cli = new Command();

const options = cli
  .option("-t, --tag <version-tag>", "version tag for generation of version-info files", version)
  .option("-d, --dev", "dev mode adds '.dev' at end of the tag", false)
  .parse(process.argv)
  .opts();

const versionInfo = {
  version: `${options.tag}${options.dev ? ".dev" : ""}`,
  buildTimestamp: new Date().getTime(),
};

// Write version info to `src\assets\version-info.json`
const assetJsonFile = resolve(__dirname, "..", "..", "public", "assets", "version-info.json");
writeFileSync(assetJsonFile, `${JSON.stringify(versionInfo, null, 2)}`, { encoding: "utf-8" });

// eslint-disable-next-line no-console
console.log(
  `${chalk.gray("[VIG]")} Wrote${options.dev ? chalk.cyanBright(" dev") : ""} version info ${chalk.blueBright(
    versionInfo.version
  )} to ${chalk.blueBright(relative(resolve(__dirname, "..", ".."), assetJsonFile))}`
);
