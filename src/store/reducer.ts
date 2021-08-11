/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date Jul 26 2021 10:39:21 GMT+05:30
 * @modify date Aug 11 2021 21:17:31 GMT+05:30
 * @desc Root store reducer
 */

import { combineReducers } from "redux";

import appStatesReducer from "./appStates/reducer";
import dataReducer from "./data/reducer";
import settingsReducer from "./settings/reducer";

const rootReducer = combineReducers({
  appStates: appStatesReducer,
  settings: settingsReducer,
  data: dataReducer,
});

export default rootReducer;
