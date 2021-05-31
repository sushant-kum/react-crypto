/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date May 31 2021 13:08:41 GMT+05:30
 * @modify date May 31 2021 13:08:41 GMT+05:30
 * @desc CoinGecko API constants
 */

export const coinGeckoApiAddress = "https://api.coingecko.com/api/v3";

const coinGeckoApiEndpoint = Object.freeze({
  coinsList: `${coinGeckoApiAddress}/coins/list`,
});

export default coinGeckoApiEndpoint;
