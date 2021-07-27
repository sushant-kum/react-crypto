/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date Apr 19 2021 18:15:30 GMT+05:30
 * @modify date Jul 27 2021 11:28:42 GMT+05:30
 * @desc Header component
 */

import { AppBar, Hidden, IconButton, Toolbar, Typography } from "@material-ui/core";
import { Brightness4Rounded, Brightness7Rounded, MenuRounded } from "@material-ui/icons";
import classNames from "classnames";
import localForage from "localforage";
import PropTypes from "prop-types";
import React, { Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";

import CustomTooltip from "../../../../components/CustomTooltip/CustomTooltip";
import LocalForageKeys from "../../../../models/LocalForage";
import { StoreDispatch } from "../../../../store";
import { getXsSideNavState, setXsSideNavState, XsSideNavState } from "../../../../store/appStates/xsSideNavState";
import { ThemeType, getThemeType, setThemeType } from "../../../../store/settings/themeType";

import styles from "./Header.module.scss";

const Header: React.FC<React.HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const dispatch: Dispatch<StoreDispatch> = useDispatch<Dispatch<StoreDispatch>>();
  const themeType: ThemeType = useSelector(getThemeType);
  const xsSideNavState: XsSideNavState = useSelector(getXsSideNavState);

  const toggleThemeType: () => void = () => {
    const newThemeType: ThemeType = themeType === "dark" ? "light" : "dark";

    localForage.setItem(LocalForageKeys.SETTINGS__GLOBAL__THEME_TYPE, newThemeType);
    dispatch(setThemeType(newThemeType));
  };

  return (
    <>
      <Hidden smUp>
        <div
          className={classNames(
            styles["Header-background"],
            xsSideNavState === "open"
              ? styles["Header-background--xs-sidenav-open"]
              : styles["Header-background--xs-sidenav-close"],
            themeType === "dark" ? "MuiAppBar-colorDefault" : "MuiAppBar-colorPrimary"
          )}
        />
      </Hidden>

      <AppBar
        className={classNames(styles.Header, props.className)}
        color={themeType === "dark" ? "default" : "primary"}
        position="sticky"
        elevation={0}
        data-testid="Header"
      >
        <Toolbar className={styles.Header__toolbar}>
          <Hidden smUp>
            <CustomTooltip
              title={
                <Typography variant="body2" component="span">
                  Open menu
                </Typography>
              }
              arrow
            >
              <IconButton
                color="inherit"
                aria-label="Open menu"
                edge="start"
                disabled={xsSideNavState === "open"}
                onClick={() => dispatch(setXsSideNavState("open"))}
              >
                <MenuRounded />
              </IconButton>
            </CustomTooltip>
          </Hidden>

          <CustomTooltip
            title={
              <Typography variant="body2" component="span">
                Switch to {themeType === "dark" ? "light" : "dark"} mode
              </Typography>
            }
            arrow
          >
            <IconButton color="inherit" edge="end" aria-label="Toggle dark mode" onClick={() => toggleThemeType()}>
              {themeType === "dark" ? <Brightness7Rounded /> : <Brightness4Rounded />}
            </IconButton>
          </CustomTooltip>
        </Toolbar>
      </AppBar>
    </>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};

Header.defaultProps = {
  className: undefined,
};

export default Header;
