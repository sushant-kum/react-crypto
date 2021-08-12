/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmial.com
 * @create date Aug 12 2021 14:09:23 GMT+05:30
 * @modify date Aug 12 2021 14:09:23 GMT+05:30
 * @desc appStates/appSubtitle store slice
 */
import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  CaseReducer,
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from "@reduxjs/toolkit";

import { AppSubtitleSetPayload } from "./models";

const initialState = "";
const SET: CaseReducer<string, PayloadAction<AppSubtitleSetPayload>> = (apptitle, action) => action.payload.appSubtitle;

const slice = createSlice<string, SliceCaseReducers<string>, "appSubtitle">({
  name: "appSubtitle",
  initialState,
  reducers: {
    SET,
  },
});

const appSubtitleSet: ActionCreatorWithPayload<AppSubtitleSetPayload, string> | ActionCreatorWithoutPayload<string> =
  slice.actions.SET;

export const setAppSubtitle =
  (appSubtitle: string) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  (dispatch: any): any =>
    dispatch(appSubtitleSet({ appSubtitle }));

export default slice.reducer;
