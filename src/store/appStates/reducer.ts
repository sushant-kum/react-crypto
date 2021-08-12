/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date Jul 27 2021 11:45:18 GMT+05:30
 * @modify date Aug 12 2021 14:07:15 GMT+05:30
 * @desc appStates reducer
 */
import { combineReducers } from "redux";

import appSubtitleReducer from "./appSubTitle/slice";
import xsSideNavStateReducer from "./xsSideNavState/slice";

const appStatesReducer = combineReducers({
  appSubtitle: appSubtitleReducer,
  xsSideNavState: xsSideNavStateReducer,
});

export default appStatesReducer;
