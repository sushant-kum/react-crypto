/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmial.com
 * @create date Aug 12 2021 14:09:06 GMT+05:30
 * @modify date Aug 12 2021 14:09:06 GMT+05:30
 * @desc Data selectors for appStates/appSubtitle store
 */
import { createSelector } from "reselect";

import { StoreState } from "../..";

// eslint-disable-next-line import/prefer-default-export
export const getAppSubtitleSelector = createSelector(
  (state: StoreState) => state.appStates.appSubtitle,
  (appSubtitle: string) => appSubtitle
);
