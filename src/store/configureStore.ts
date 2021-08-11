/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date Jul 26 2021 10:40:34 GMT+05:30
 * @modify date Aug 11 2021 21:17:19 GMT+05:30
 * @desc Store configurateion
 */

import { configureStore as reduxConfigureStore } from "@reduxjs/toolkit";
import { apiMiddleware } from "redux-api-middleware";

import rootReducer from "./reducer";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const configureStore = () =>
  reduxConfigureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiMiddleware),
  });

export default configureStore;
