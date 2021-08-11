/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date Jul 27 2021 11:58:09 GMT+05:30
 * @modify date Aug 11 2021 21:16:04 GMT+05:30
 * @desc autoRefreshMarkets slice
 */

import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  CaseReducer,
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from "@reduxjs/toolkit";
import localforage from "localforage";

import LocalForageKeys from "../../../models/LocalForage";

import { AutoRefreshMarketsSetPayload } from "./models/AutoRefreshMarketsSetPayload";

const initialState = false;
const SET: CaseReducer<boolean, PayloadAction<AutoRefreshMarketsSetPayload>> = (autoRefreshMarkets, action) =>
  action.payload.autoRefreshMarkets;
const slice = createSlice<boolean, SliceCaseReducers<boolean>, "autoRefreshMarkets">({
  name: "autoRefreshMarkets",
  initialState,
  reducers: {
    SET,
  },
});
const autoRefreshMarketsSet:
  | ActionCreatorWithPayload<AutoRefreshMarketsSetPayload, string>
  | ActionCreatorWithoutPayload<string> = slice.actions.SET;

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export const setAutoRefreshMarkets =
  (autoRefreshMarkets: boolean) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  (dispatch: any): any => {
    localforage.setItem(LocalForageKeys.SETTINGS__GLOBAL__AUTO_REFRESH_MARKETS, autoRefreshMarkets).then(() => {
      dispatch(autoRefreshMarketsSet({ autoRefreshMarkets }));
    });
  };

export default slice.reducer;
