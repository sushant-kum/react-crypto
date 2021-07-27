/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date Jul 27 2021 11:58:09 GMT+05:30
 * @modify date Jul 27 2021 11:58:09 GMT+05:30
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
  (dispatch: any): any =>
    dispatch(autoRefreshMarketsSet({ autoRefreshMarkets }));

export default slice.reducer;
