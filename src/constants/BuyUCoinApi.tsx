/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date May 22 2021 14:26:41 GMT+05:30
 * @modify date May 22 2021 14:26:41 GMT+05:30
 * @desc Constants for BuyUCoin APIs
 */

export const buyUCoinApiAddress = "https://api.buyucoin.com";

const buyUCoinApiEndpoint = Object.freeze({
  tickerData: `${buyUCoinApiAddress}/ticker/v1.0/liveData`,
});

export default buyUCoinApiEndpoint;
