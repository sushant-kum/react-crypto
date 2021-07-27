/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date Jul 27 2021 11:45:52 GMT+05:30
 * @modify date Jul 27 2021 11:45:52 GMT+05:30
 * @desc xsSideNavState selectors
 */

import { createSelector } from "@reduxjs/toolkit";

import { StoreState } from "../..";

import { XsSideNavState } from "./data-models";

// eslint-disable-next-line import/prefer-default-export
export const getXsSideNavState = createSelector(
  (state: StoreState) => state.appStates.xsSideNavState,
  (xsSideNavState: XsSideNavState) => xsSideNavState
);
