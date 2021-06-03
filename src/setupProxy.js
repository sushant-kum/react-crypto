/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date Jun 03 2021 14:00:28 GMT+05:30
 * @modify date Jun 03 2021 14:01:21 GMT+05:30
 * @desc Proxy using HPM
 */

/* eslint-disable @typescript-eslint/no-var-requires */

const createProxyMiddleware = require("http-proxy-middleware");

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
