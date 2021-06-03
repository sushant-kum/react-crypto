/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date May 22 2021 14:26:41 GMT+05:30
 * @modify date Jun 03 2021 13:59:47 GMT+05:30
 * @desc Constants for BuyUCoin APIs
 */

export const buyUCoinApiAddress = "/api/buyucoin";

const buyUCoinApiEndpoint = Object.freeze({
  tickerData: `${buyUCoinApiAddress}/liveData`,
});

export default buyUCoinApiEndpoint;
