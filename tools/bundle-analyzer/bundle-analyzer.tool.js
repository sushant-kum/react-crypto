/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */

process.env.NODE_ENV = "production";

const chalk = require("chalk");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const webpackConfigProd = require("react-scripts/config/webpack.config")("production");
const webpack = require("webpack");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

webpackConfigProd.plugins.push(new BundleAnalyzerPlugin());

webpackConfigProd.plugins.push(
  new ProgressBarPlugin({
    format: `${chalk.gray("[BA]")} ${chalk.green("[:percent]")} :bar ${chalk.green("[:elapsed seconds]")} - :msg`,
    complete: "█",
    incomplete: chalk.gray("█"),
  })
);

webpack(webpackConfigProd, (err, stats) => {
  if (err || stats.hasErrors()) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
});
