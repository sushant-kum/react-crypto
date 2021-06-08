/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date May 31 2021 13:08:41 GMT+05:30
 * @modify date Jun 08 2021 18:06:03 GMT+05:30
 * @desc CoinGecko API constants
 */

export const coinGeckoApiAddress = "/api/coigecko";

const coinGeckoApiEndpoint = Object.freeze({
  coinsList: `${coinGeckoApiAddress}/coins/list`,
  marketChartData: (coin: string): string => {
    return `${coinGeckoApiAddress}/coins/${coin}/market_chart/range`;
  },
});

export interface CoinGeckoApiQueryParams {
  marketChartData: {
    vs_currency: string;
    from: number;
    to: number;
  };
}

export default coinGeckoApiEndpoint;
