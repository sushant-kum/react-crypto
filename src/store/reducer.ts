/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date Jul 26 2021 10:39:21 GMT+05:30
 * @modify date Jul 26 2021 10:39:21 GMT+05:30
 * @desc Root store reducer
 */

import { combineReducers } from "redux";

import settingsReducer from "./settings/reducer";

const rootReducer = combineReducers({
  settings: settingsReducer,
});

export default rootReducer;
