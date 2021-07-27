/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date Jul 26 2021 10:42:45 GMT+05:30
 * @modify date Jul 26 2021 10:42:45 GMT+05:30
 * @desc Settings reducer
 */

import { combineReducers } from "redux";

import autoRefreshMarketsReducer from "./autoRefreshMarkets/slice";
import themeTypeReducer from "./themeType/slice";

const settingsReducer = combineReducers({
  themeType: themeTypeReducer,
  autoRefreshMarkets: autoRefreshMarketsReducer,
});

export default settingsReducer;
