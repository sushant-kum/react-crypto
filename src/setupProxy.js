/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date Jun 03 2021 14:00:28 GMT+05:30
 * @modify date Jul 25 2021 18:30:40 GMT+05:30
 * @desc Proxy using HPM
 */

/* eslint-disable @typescript-eslint/no-var-requires */

// eslint-disable-next-line import/no-extraneous-dependencies
const { createProxyMiddleware } = require("http-proxy-middleware");

const proxyRules = require("../proxy-config.json");

module.exports = (app) => {
  Object.keys(proxyRules).forEach((proxyTarget) => {
    app.use(
      proxyTarget,
      createProxyMiddleware({
        target: proxyRules[proxyTarget].target,
        pathRewrite: proxyRules[proxyTarget].pathRewrite,
        changeOrigin: proxyRules[proxyTarget].changeOrigin,
      })
    );
  });
};
