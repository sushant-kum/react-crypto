/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date Apr 19 2021 17:52:56 GMT+05:30
 * @modify date May 18 2021 20:00:21 GMT+05:30
 * @desc DarkModeContext
 */

import { Context, createContext } from "react";

import { DarkModeContextValue } from "../models/DarkMode";

export const darkModeContextInitialState: DarkModeContextValue = {
  darkModeSelection: true,
};

const DarkModeContext: Context<DarkModeContextValue> = createContext<DarkModeContextValue>(darkModeContextInitialState);

export default DarkModeContext;
