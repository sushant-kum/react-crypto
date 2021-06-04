/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date Jun 04 2021 19:07:38 GMT+05:30
 * @modify date Jun 04 2021 19:07:38 GMT+05:30
 * @desc SnackbarContext
 */

import { Context, createContext } from "react";

import { SnackbarContextValue } from "../models/Snackbar";

export const snackbarInitialState: SnackbarContextValue = {
  snackbarOpen: false,
  snackbarMessage: "",
  snackbarDurationMS: 0,
};

const SnackbarContext: Context<SnackbarContextValue> = createContext<SnackbarContextValue>(snackbarInitialState);

export default SnackbarContext;
