/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date Apr 19 2021 18:15:30 GMT+05:30
 * @modify date Apr 20 2021 19:47:58 GMT+05:30
 * @desc Header component
 */

import { AppBar, Hidden, IconButton, Toolbar, Tooltip } from "@material-ui/core";
import { Brightness4Rounded, Brightness7Rounded, MenuRounded } from "@material-ui/icons";
import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useContext } from "react";

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
      <AppBar
        className={classNames(styles.Header, props.className)}
        color="primary"
        position="sticky"
        data-testid="Header"
      >
        <Toolbar className={styles.Header__toolbar}>
          <Hidden smUp>
            <Tooltip title="Open menu">
              <IconButton
                color="inherit"
                aria-label="Open menu"
                edge="start"
                disabled={xsSideNavOpen}
                onClick={() => xsSideNavOpenUpdate?.(true)}
              >
                <MenuRounded />
              </IconButton>
            </Tooltip>
          </Hidden>

          <Tooltip title={`Switch to ${darkModeSelection ? "light" : "dark"} mode`}>
            <IconButton
              color="inherit"
              aria-label="Toggle dark mode"
              onClick={() => darkModeSelectionUpdate?.(!darkModeSelection)}
            >
              {darkModeSelection ? <Brightness7Rounded /> : <Brightness4Rounded />}
            </IconButton>
          </Tooltip>
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
