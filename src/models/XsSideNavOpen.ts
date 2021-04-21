/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date Apr 20 2021 19:53:36 GMT+05:30
 * @modify date Apr 20 2021 19:53:36 GMT+05:30
 * @desc [description]
 */

export type XsSideNavOpen = boolean;

export interface XsSideNavOpenContextValue {
  xsSideNavOpen: XsSideNavOpen;
  xsSideNavOpenUpdate?: (state: boolean) => void;
}
