/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date Apr 20 2021 19:46:06 GMT+05:30
 * @modify date Apr 20 2021 19:46:06 GMT+05:30
 * @desc XsSideNavOpenContext
 */

import { Context, createContext } from "react";

import { XsSideNavOpenContextValue } from "../models/XsSideNavOpen";

export const xsSideNavOpenInitialState: XsSideNavOpenContextValue = {
  xsSideNavOpen: false,
};

const XsSideNavOpenContext: Context<XsSideNavOpenContextValue> = createContext<XsSideNavOpenContextValue>(
  xsSideNavOpenInitialState
);

export default XsSideNavOpenContext;
