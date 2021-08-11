import { createSelector } from "reselect";

import { StoreState } from "../..";

import { MarketData, MarketsData } from "./models";

export const getAllMarketsDataSelector = createSelector(
  (state: StoreState) => state.data.marketsData,
  (marketsData: MarketsData) => marketsData.data
);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getSingleMarketDataSelector = (marketName: string) =>
  createSelector(
    (state: StoreState) => state.data.marketsData,
    (marketsData: MarketsData) =>
      marketsData.data.filter((marketData: MarketData) => marketData.name.market === marketName)[0]
  );

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getMultipleMarketsDataSelector = (marketNames: string[]) =>
  createSelector(
    (state: StoreState) => state.data.marketsData,
    (marketsData: MarketsData) =>
      marketsData.data.filter((marketData: MarketData) => marketNames.includes(marketData.name.market))
  );

export const getMarketsDataLoadingSelector = createSelector(
  (state: StoreState) => state.data.marketsData,
  (marketsData: MarketsData) => marketsData.loading
);

export const getStarredMarketsSelector = createSelector(
  (state: StoreState) => state.data.marketsData,
  (marketsData: MarketsData) =>
    marketsData.data
      .filter((marketData: MarketData) => marketData.starred)
      .map((marketData: MarketData) => marketData.name.market)
);
