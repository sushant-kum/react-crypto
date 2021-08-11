/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date Aug 11 2021 21:13:48 GMT+05:30
 * @modify date Aug 11 2021 21:13:48 GMT+05:30
 * @desc Data models for data/marketData store payloads
 */

import { BuyUCoinTickerDataApiResponse, CoinGeckoCoinsListApiElement } from "./MarketDataApiResponse";

export interface MarketsDataBuyUCoinFetchSucceededPayload {
  buyUCoinRawData: BuyUCoinTickerDataApiResponse;
  starredMarkets: string[];
}

export interface MarketsDataCoinGeckoFetchSucceededPayload {
  coiGeckoRawData: CoinGeckoCoinsListApiElement[];
  starredMarkets: string[];
}

export interface MarketsDataStarToggledPayload {
  market: string;
  starred: boolean;
}
