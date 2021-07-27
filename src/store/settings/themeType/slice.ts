/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date Jul 26 2021 10:43:56 GMT+05:30
 * @modify date Jul 27 2021 11:55:56 GMT+05:30
 * @desc Theme type slice
 */

import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  CaseReducer,
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from "@reduxjs/toolkit";

import { ThemeTypeSetPayload } from "./models/Payload";
import { ThemeType } from "./models/ThemeType";

const initialState: ThemeType = "dark";
const SET: CaseReducer<ThemeType, PayloadAction<ThemeTypeSetPayload>> = (themeType, action) => action.payload.themeType;

const slice = createSlice<ThemeType, SliceCaseReducers<ThemeType>, "themeType">({
  name: "themeType",
  initialState,
  reducers: {
    SET,
  },
});

const themeTypeSet: ActionCreatorWithPayload<ThemeTypeSetPayload, string> | ActionCreatorWithoutPayload<string> =
  slice.actions.SET;

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export const setThemeType =
  (themeType: ThemeType) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  (dispatch: any): any =>
    dispatch(themeTypeSet({ themeType }));

export default slice.reducer;
