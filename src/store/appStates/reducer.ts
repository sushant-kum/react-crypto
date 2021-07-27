/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date Jul 27 2021 11:45:18 GMT+05:30
 * @modify date Jul 27 2021 11:45:18 GMT+05:30
 * @desc appStates reducer
 */
import { combineReducers } from "redux";

import xsSideNavStateReducer from "./xsSideNavState/slice";

const appStatesReducer = combineReducers({
  xsSideNavState: xsSideNavStateReducer,
});

export default appStatesReducer;
