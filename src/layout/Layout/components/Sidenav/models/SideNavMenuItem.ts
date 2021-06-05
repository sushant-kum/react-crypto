/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date Apr 20 2021 19:53:05 GMT+05:30
 * @modify date Apr 20 2021 19:53:05 GMT+05:30
 * @desc Data models relate to sidenav menu items
 */

import { ReactNode } from "react";

/**
 * Data model for sidenav menu item
 *
 * @author Sushant Kumar<sushant.kum96@gmail.com>
 * @export
 * @interface SideNavMenuItem
 */
export interface SideNavMenuItem {
  icon: ReactNode;
  text: string;
  path: string;
}
