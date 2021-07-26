/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date Jul 26 2021 11:09:49 GMT+05:30
 * @modify date Jul 26 2021 11:09:49 GMT+05:30
 * @desc Theme type selectors
 */

import { createSelector } from "@reduxjs/toolkit";

import { StoreState } from "../..";

import { ThemeType } from "./data-models";

// eslint-disable-next-line import/prefer-default-export
export const getThemeType = createSelector(
  (state: StoreState) => state.settings.themeType,
  (themeType: ThemeType) => themeType
);
