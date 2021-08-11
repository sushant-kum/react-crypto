/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date Jul 28 2021 12:38:56 GMT+05:30
 * @modify date Aug 11 2021 21:15:17 GMT+05:30
 * @desc Data reducer
 */
import { combineReducers } from "redux";

import marketsDataSlice from "./marketsData/slice";

const dataReducer = combineReducers({
  marketsData: marketsDataSlice,
});

export default dataReducer;
