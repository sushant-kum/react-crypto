/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date Apr 20 2021 19:45:26 GMT+05:30
 * @modify date Apr 20 2021 19:45:26 GMT+05:30
 * @desc Constants related to sidenav
 */

import { DashboardRounded, SettingsRounded } from "@material-ui/icons";
import React from "react";

import { SideNavMenuItem } from "../models/SideNavMenuItem";

const SIDENAV_MENU_ITEMS: readonly SideNavMenuItem[] = Object.freeze([
  {
    icon: <DashboardRounded />,
    text: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: <SettingsRounded />,
    text: "Settings",
    path: "/settings",
  },
]);

export default SIDENAV_MENU_ITEMS;
