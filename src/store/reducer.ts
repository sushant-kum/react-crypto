/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date Jul 26 2021 10:39:21 GMT+05:30
 * @modify date Jul 27 2021 11:26:33 GMT+05:30
 * @desc Root store reducer
 */

import { combineReducers } from "redux";

import appStatesReducer from "./appStates/reducer";
import settingsReducer from "./settings/reducer";

const rootReducer = combineReducers({
  appStates: appStatesReducer,
  settings: settingsReducer,
});

export default rootReducer;
