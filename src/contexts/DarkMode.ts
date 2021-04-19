/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date Apr 19 2021 17:52:56 GMT+05:30
 * @modify date Apr 19 2021 17:52:56 GMT+05:30
 * @desc DarkModeContext
 */

import { Context, createContext } from "react";

import { DarkModeContextValue } from "../models/DarkMode";
import LocalStorageKeys from "../models/LocalStorage";

export const darkModeContextInitialState: DarkModeContextValue = {
  darkModeSelection: window.localStorage.getItem(LocalStorageKeys.CONFIG__DARKMODE)
    ? window.localStorage.getItem(LocalStorageKeys.CONFIG__DARKMODE) === "true"
    : undefined,
};

const DarkModeContext: Context<DarkModeContextValue> = createContext<DarkModeContextValue>(darkModeContextInitialState);

export default DarkModeContext;
