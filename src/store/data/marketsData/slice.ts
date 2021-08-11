/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date Jul 28 2021 11:16:10 GMT+05:30
 * @modify date Aug 11 2021 21:14:41 GMT+05:30
 * @desc marketsData slice
 */

/* eslint-disable no-param-reassign */

import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  CaseReducer,
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from "@reduxjs/toolkit";
import localforage from "localforage";
import { createAction as createApiAction, getJSON } from "redux-api-middleware";

import buyUCoinApiEndpoint from "../../../constants/BuyUCoinApi";
import coinGeckoApiEndpoint from "../../../constants/CoingeckoApi";
import LocalForageKeys from "../../../models/LocalForage";

import {
  BuyUCoinTickerDataApiResponse,
  CoinGeckoCoinsListApiElement,
  MarketData,
  BuyUCoinTickerDataMetricesApiResponse,
  MarketsData,
  MarketsDataStarToggledPayload,
  MarketsDataBuyUCoinFetchSucceededPayload,
  MarketsDataCoinGeckoFetchSucceededPayload,
} from "./models";

const initialState: MarketsData = {
  data: [],
  tempData: {
    buyUCoin: null,
    coinGecko: null,
  },
};

const parseMarketDataApiResponse: (
  buyUCoinMarketDataApiResponse: BuyUCoinTickerDataApiResponse,
  coinGeckoCoinsList: CoinGeckoCoinsListApiElement[],
  starredMarkets: string[]
) => MarketData[] = (buyUCoinMarketDataApiResponse, coinGeckoCoinsList, starredMarkets) => {
  const consideredCoins: MarketData[] = [];

  buyUCoinMarketDataApiResponse.data.forEach((metrices: BuyUCoinTickerDataMetricesApiResponse) => {
    const coinGeckoSymbolMatches: CoinGeckoCoinsListApiElement[] = coinGeckoCoinsList.filter(
      (coin: CoinGeckoCoinsListApiElement) =>
        coin.symbol.toLowerCase() === metrices.marketName.split("-")[1].toLowerCase()
    );

    let coinGeckoId: string | undefined;

    if (coinGeckoSymbolMatches.length === 1) {
      coinGeckoId = coinGeckoSymbolMatches[0].id;
    } else if (coinGeckoSymbolMatches.length > 1) {
      coinGeckoId = coinGeckoSymbolMatches.filter(
        (coin: CoinGeckoCoinsListApiElement) =>
          coin.id.toLowerCase() === metrices.currToName.toLowerCase() ||
          coin.name.toLowerCase() === metrices.currToName.toLowerCase()
      )[0]?.id;
    } else {
      coinGeckoId = undefined;
    }

    if (coinGeckoId !== undefined) {
      const marketData: MarketData = {
        name: {
          market: metrices.marketName,
          currency: metrices.currToName,
          exchangingCurrency: metrices.marketName.split("-")[1],
          quotationCurrency: metrices.marketName.split("-")[0],
        },
        coinGeckoId,
        icons: {
          selfHosted: {
            black: `/assets/images/crypto-icons/svg/black/${metrices.marketName.split("-")[1].toLowerCase()}.svg`,
            white: `/assets/images/crypto-icons/svg/white/${metrices.marketName.split("-")[1].toLowerCase()}.svg`,
          },
          buyUCoin: `https://d33epyjwhmr3r5.cloudfront.net/assets/images/currency/${metrices.marketName
            .split("-")[1]
            .toLowerCase()}.png`,
        },
        bestBid: +metrices.bid,
        bestAsk: +metrices.ask,
        bidAskDiffPerc: +metrices.sprd,
        totalLimitOrderVolume: {
          bid: +metrices.tVolBid,
          ask: +metrices.tVolAsk,
        },
        twentyFourHr: {
          highestPrice: +metrices.h24,
          lowestPrice: +metrices.l24,
          tradedVolume: +metrices.v24,
          tradedVolumeQuotationCurrency: +metrices.tp24,
          priceChange: +metrices.c24,
          priceChangePercentage: +metrices.c24p,
        },
        lastTrade: {
          price: +metrices.LTRate,
          volume: +metrices.LTVol,
        },
        lastBuy: {
          price: +metrices.LBRate,
          volume: +metrices.LBVol,
        },
        lastSell: {
          price: +metrices.LSRate,
          volume: +metrices.LSVol,
        },
        starred: starredMarkets.includes(metrices.marketName),
      };

      consideredCoins.push(marketData);
    }
  });

  return consideredCoins;
};

const BUYUCOIN_FETCH_STARTED: CaseReducer<MarketsData> = (marketsData) => {
  marketsData.loading = true;
};
const BUYUCOIN_FETCH_SUCCEEDED: CaseReducer<MarketsData, PayloadAction<MarketsDataBuyUCoinFetchSucceededPayload>> = (
  marketsData,
  action
) => {
  if (marketsData.tempData.coinGecko !== null) {
    marketsData.data = parseMarketDataApiResponse(
      action.payload.buyUCoinRawData,
      marketsData.tempData.coinGecko,
      action.payload.starredMarkets
    );
    marketsData.loading = false;
  } else {
    marketsData.tempData.buyUCoin = action.payload.buyUCoinRawData;
  }

  marketsData.tempData.coinGecko = null;
};
const BUYUCOIN_FETCH_FAILED: CaseReducer<MarketsData> = (marketsData) => {
  marketsData.tempData.buyUCoin = null;
  marketsData.tempData.coinGecko = null;
  marketsData.loading = false;
};

const COINGECKO_FETCH_STARTED: CaseReducer<MarketsData> = (marketsData) => {
  marketsData.loading = true;
};
const COINGECKO_FETCH_SUCCEEDED: CaseReducer<MarketsData, PayloadAction<MarketsDataCoinGeckoFetchSucceededPayload>> = (
  marketsData,
  action
) => {
  if (marketsData.tempData.buyUCoin !== null) {
    marketsData.data = parseMarketDataApiResponse(
      marketsData.tempData.buyUCoin,
      action.payload.coiGeckoRawData,
      action.payload.starredMarkets
    );
    marketsData.loading = false;
  } else {
    marketsData.tempData.coinGecko = action.payload.coiGeckoRawData;
  }

  marketsData.tempData.buyUCoin = null;
};
const COINGECKO_FETCH_FAILED: CaseReducer<MarketsData> = (marketsData) => {
  marketsData.tempData.buyUCoin = null;
  marketsData.tempData.coinGecko = null;
  marketsData.loading = false;
};

const STAR_TOGGLED: CaseReducer<MarketsData, PayloadAction<MarketsDataStarToggledPayload>> = (marketsData, action) => {
  marketsData.data.filter((marketData: MarketData) => marketData.name.market === action.payload.market)[0].starred =
    action.payload.starred;
};

const slice = createSlice<MarketsData, SliceCaseReducers<MarketsData>, "marketsData">({
  name: "marketsData",
  initialState,
  reducers: {
    BUYUCOIN_FETCH_STARTED,
    BUYUCOIN_FETCH_SUCCEEDED,
    BUYUCOIN_FETCH_FAILED,
    COINGECKO_FETCH_STARTED,
    COINGECKO_FETCH_SUCCEEDED,
    COINGECKO_FETCH_FAILED,
    STAR_TOGGLED,
  },
});

const marketsDataBuyucoinFetchStarted:
  | ActionCreatorWithPayload<undefined, string>
  | ActionCreatorWithoutPayload<string> = slice.actions.BUYUCOIN_FETCH_STARTED;
const marketsDataBuyucoinFetchSucceeded:
  | ActionCreatorWithPayload<BuyUCoinTickerDataApiResponse, string>
  | ActionCreatorWithoutPayload<string> = slice.actions.BUYUCOIN_FETCH_SUCCEEDED;
const marketsDataBuyucoinFetchFailed:
  | ActionCreatorWithPayload<undefined, string>
  | ActionCreatorWithoutPayload<string> = slice.actions.BUYUCOIN_FETCH_FAILED;
const marketsDataCoingeckoFetchStarted:
  | ActionCreatorWithPayload<undefined, string>
  | ActionCreatorWithoutPayload<string> = slice.actions.COINGECKO_FETCH_STARTED;
const marketsDataCoingeckoFetchSucceeded:
  | ActionCreatorWithPayload<CoinGeckoCoinsListApiElement[], string>
  | ActionCreatorWithoutPayload<string> = slice.actions.COINGECKO_FETCH_SUCCEEDED;
const marketsDataCoingeckoFetchFailed:
  | ActionCreatorWithPayload<undefined, string>
  | ActionCreatorWithoutPayload<string> = slice.actions.COINGECKO_FETCH_FAILED;
const marketDataStarToggled:
  | ActionCreatorWithPayload<MarketsDataStarToggledPayload, string>
  | ActionCreatorWithoutPayload<string> = slice.actions.STAR_TOGGLED;

export const fetchMarketsData =
  () =>
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  async (dispatch: any): Promise<any> => {
    const starredMarkets: string[] =
      (await localforage.getItem<string[]>(LocalForageKeys.SETTINGS__GLOBAL__STARRED_MARKETS)) ?? [];

    dispatch(
      createApiAction({
        endpoint: buyUCoinApiEndpoint.tickerData,
        method: "GET",
        types: [
          {
            type: marketsDataBuyucoinFetchStarted.type,
            meta: { source: buyUCoinApiEndpoint.tickerData },
          },
          {
            type: marketsDataBuyucoinFetchSucceeded.type,
            payload: async (action, state, res) => {
              const buyUCoinRawData: BuyUCoinTickerDataApiResponse = await getJSON(res);

              return {
                buyUCoinRawData,
                starredMarkets,
              };
            },
          },
          marketsDataBuyucoinFetchFailed.type,
        ],
      })
    );
    dispatch(
      createApiAction({
        endpoint: coinGeckoApiEndpoint.coinsList,
        method: "GET",
        types: [
          {
            type: marketsDataCoingeckoFetchStarted.type,
            meta: { source: coinGeckoApiEndpoint.coinsList },
          },
          {
            type: marketsDataCoingeckoFetchSucceeded.type,
            payload: async (action, state, res) => {
              const coiGeckoRawData: CoinGeckoCoinsListApiElement[] = await getJSON(res);

              return {
                coiGeckoRawData,
                starredMarkets,
              };
            },
          },

          marketsDataCoingeckoFetchFailed.type,
        ],
      })
    );
  };

export const setMarketStarValue =
  (market: string, starred: boolean) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  async (dispatch: any): Promise<any> => {
    const starredMarkets: string[] =
      (await localforage.getItem<string[]>(LocalForageKeys.SETTINGS__GLOBAL__STARRED_MARKETS)) ?? [];

    if (starred && !starredMarkets.includes(market)) {
      starredMarkets.push(market);
      localforage.setItem(LocalForageKeys.SETTINGS__GLOBAL__STARRED_MARKETS, starredMarkets);
    } else if (starredMarkets.includes(market)) {
      starredMarkets.splice(starredMarkets.indexOf(market), 1);
      localforage.setItem(LocalForageKeys.SETTINGS__GLOBAL__STARRED_MARKETS, starredMarkets);
    }

    return dispatch(marketDataStarToggled({ market, starred }));
  };

export default slice.reducer;
