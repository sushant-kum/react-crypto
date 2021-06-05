/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date Apr 19 2021 18:15:30 GMT+05:30
 * @modify date Jun 05 2021 13:15:15 GMT+05:30
 * @desc Header component
 */

import { AppBar, Hidden, IconButton, Toolbar, Typography } from "@material-ui/core";
import { Brightness4Rounded, Brightness7Rounded, MenuRounded } from "@material-ui/icons";
import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useContext } from "react";

import CustomTooltip from "../../components/CustomTooltip/CustomTooltip";
import DarkModeContext from "../../contexts/DarkMode";
import XsSideNavOpenContext from "../../contexts/XsSideNavOpen";
import { DarkModeContextValue } from "../../models/DarkMode";
import { XsSideNavOpenContextValue } from "../../models/XsSideNavOpen";

import styles from "./Header.module.scss";

const Header: React.FC<React.HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const { darkModeSelection, darkModeSelectionUpdate } = useContext<DarkModeContextValue>(DarkModeContext);
  const { xsSideNavOpen, xsSideNavOpenUpdate } = useContext<XsSideNavOpenContextValue>(XsSideNavOpenContext);

  return (
    <>
      <Hidden smUp>
        <div
          className={classNames(
            styles["Header-background"],
            xsSideNavOpen
              ? styles["Header-background--xs-sidenav-open"]
              : styles["Header-background--xs-sidenav-close"],
            darkModeSelection ? "MuiAppBar-colorDefault" : "MuiAppBar-colorPrimary"
          )}
        />
      </Hidden>

      <AppBar
        className={classNames(styles.Header, props.className)}
        color={darkModeSelection ? "default" : "primary"}
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
                disabled={xsSideNavOpen}
                onClick={() => xsSideNavOpenUpdate?.(true)}
              >
                <MenuRounded />
              </IconButton>
            </CustomTooltip>
          </Hidden>

          <CustomTooltip
            title={
              <Typography variant="body2" component="span">
                Switch to {darkModeSelection ? "light" : "dark"} mode
              </Typography>
            }
            arrow
          >
            <IconButton
              color="inherit"
              edge="end"
              aria-label="Toggle dark mode"
              onClick={() => darkModeSelectionUpdate?.(!darkModeSelection)}
            >
              {darkModeSelection ? <Brightness7Rounded /> : <Brightness4Rounded />}
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
