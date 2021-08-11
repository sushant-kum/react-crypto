/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date Jul 27 2021 12:09:12 GMT+05:30
 * @modify date Aug 11 2021 21:15:53 GMT+05:30
 * @desc autoRefreshMarkets selectors
 */

import { createSelector } from "@reduxjs/toolkit";

import { StoreState } from "../..";

// eslint-disable-next-line import/prefer-default-export
export const getAutoRefreshMarketsSelector = createSelector(
  (state: StoreState) => state.settings.autoRefreshMarkets,
  (autoRefreshMarkets: boolean) => autoRefreshMarkets
);
