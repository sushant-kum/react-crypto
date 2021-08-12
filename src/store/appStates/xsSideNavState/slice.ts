/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date Jul 26 2021 11:57:19 GMT+05:30
 * @modify date Aug 12 2021 14:06:45 GMT+05:30
 * @desc XsSideNavState slice
 */

import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  CaseReducer,
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from "@reduxjs/toolkit";

import { XsSideNavState, XsSideNavStateSetPayload } from "./models";

const initialState: XsSideNavState = "close";
const SET: CaseReducer<XsSideNavState, PayloadAction<XsSideNavStateSetPayload>> = (xsSideNavState, action) =>
  action.payload.xsSideNavState;

const slice = createSlice<XsSideNavState, SliceCaseReducers<XsSideNavState>, "xsSideNavState">({
  name: "xsSideNavState",
  initialState,
  reducers: {
    SET,
  },
});

const xsSideNavStateSet:
  | ActionCreatorWithPayload<XsSideNavStateSetPayload, string>
  | ActionCreatorWithoutPayload<string> = slice.actions.SET;

export const setXsSideNavState =
  (xsSideNavState: XsSideNavState) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  (dispatch: any): any =>
    dispatch(xsSideNavStateSet({ xsSideNavState }));

export default slice.reducer;
