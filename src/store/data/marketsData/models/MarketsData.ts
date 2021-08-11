/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date Aug 11 2021 21:13:13 GMT+05:30
 * @modify date Aug 11 2021 21:13:13 GMT+05:30
 * @desc Data model for markets data
 */

import { MarketData } from "./MarketData";
import { BuyUCoinTickerDataApiResponse, CoinGeckoCoinsListApiElement } from "./MarketDataApiResponse";

export interface MarketsData {
  data: MarketData[];
  tempData: {
    buyUCoin: BuyUCoinTickerDataApiResponse | null;
    coinGecko: CoinGeckoCoinsListApiElement[] | null;
  };
  loading?: boolean;
}
