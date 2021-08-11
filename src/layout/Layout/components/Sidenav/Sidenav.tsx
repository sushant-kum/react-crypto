/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date Apr 19 2021 18:16:58 GMT+05:30
 * @modify date Aug 11 2021 21:04:16 GMT+05:30
 * @desc Sidenav component
 */

import {
  Divider,
  Drawer,
  Hidden,
  List,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Typography,
} from "@material-ui/core";
import classNames from "classnames";
import PropTypes from "prop-types";
import React, { Dispatch, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import productLogo from "../../../../assets/images/logo.svg";
import ListItemLink from "../../../../components/ListItemLink/ListItemLink";
import { StoreDispatch } from "../../../../store";
import {
  XsSideNavState,
  getXsSideNavStateSelector,
  setXsSideNavState,
} from "../../../../store/appStates/xsSideNavState";

import SIDENAV_MENU_ITEMS from "./constants/SideNav";
import { SideNavMenuItem } from "./models/SideNavMenuItem";
import styles from "./Sidenav.module.scss";

const Sidenav: React.FC<React.HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const location = useLocation();
  const dispatch: Dispatch<StoreDispatch> = useDispatch<Dispatch<StoreDispatch>>();
  const xsSideNavState: XsSideNavState = useSelector(getXsSideNavStateSelector);
  const [menuHovered, menuHoveredSet]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] =
    useState<boolean>(false);
  const sidenavExpansionDuration: number = +styles.sidenavExpansionDuration.split("ms")[0];

  return (
    <nav className={classNames(styles.Sidenav, props.className)} data-testid="Sidenav">
      <Hidden smUp>
        <SwipeableDrawer
          className={classNames(styles.Sidenav__drawer, styles["Sidenav__drawer--xs"])}
          classes={{
            paper: classNames(styles.Sidenav__drawer__paper, styles["Sidenav__drawer__paper--xs"]),
          }}
          anchor="left"
          transitionDuration={sidenavExpansionDuration}
          open={xsSideNavState === "open"}
          onOpen={() => dispatch(setXsSideNavState("open"))}
          onClose={() => dispatch(setXsSideNavState("close"))}
        >
          <section className={classNames(styles.Sidenav__drawer__header, styles["Sidenav__drawer__header--xs"])}>
            <img
              className={styles.Sidenav__drawer__header__logo}
              src={productLogo}
              width="40"
              height="40"
              alt="Crypto Info"
            />
            <Typography
              className={classNames(styles.Sidenav__drawer__text, styles["Sidenav__drawer__text--xs"])}
              variant="h5"
              color="primary"
            >
              Crypto Info
            </Typography>
          </section>

          <Divider />

          <List className={classNames(styles.Sidenav__drawer__menu)}>
            {React.Children.toArray(
              SIDENAV_MENU_ITEMS.map((sideNavMenuItem: SideNavMenuItem) => {
                return (
                  <ListItemLink
                    className={classNames(
                      styles.Sidenav__drawer__menu__item,
                      styles["Sidenav__drawer__menu__item--xs"],
                      location.pathname === sideNavMenuItem.path
                        ? styles["Sidenav__drawer__menu__item--active-item"]
                        : null
                    )}
                    to={sideNavMenuItem.path}
                    selected={location.pathname === sideNavMenuItem.path}
                  >
                    <ListItemIcon
                      className={classNames(
                        styles.Sidenav__drawer__menu__item__icon,
                        styles["Sidenav__drawer__menu__item__icon--xs"]
                      )}
                    >
                      {sideNavMenuItem.icon}
                    </ListItemIcon>
                    <ListItemText
                      className={classNames(styles.Sidenav__drawer__text, styles["Sidenav__drawer__text--xs"])}
                    >
                      {sideNavMenuItem.text}
                    </ListItemText>
                  </ListItemLink>
                );
              })
            )}
          </List>
        </SwipeableDrawer>
      </Hidden>

      <Hidden xsDown>
        <Drawer
          className={classNames(
            styles.Sidenav__drawer,
            styles["Sidenav__drawer--xs-plus"],
            menuHovered ? styles["Sidenav__drawer--sidenav-hovered"] : null
          )}
          classes={{
            paper: classNames(
              styles.Sidenav__drawer__paper,
              styles["Sidenav__drawer__paper--xs-plus"],
              menuHovered ? styles["Sidenav__drawer__paper--sidenav-hovered"] : null
            ),
          }}
          variant="permanent"
          onMouseEnter={() => menuHoveredSet(true)}
          onMouseLeave={() => menuHoveredSet(false)}
        >
          <section
            className={classNames(
              styles.Sidenav__drawer__header,
              menuHovered ? styles["Sidenav__drawer__header--sidenav-hovered"] : null
            )}
          >
            <img
              className={styles.Sidenav__drawer__header__logo}
              src={productLogo}
              width="40"
              height="40"
              alt="Crypto Info"
            />
            <Typography
              className={classNames(
                styles.Sidenav__drawer__text,
                menuHovered ? styles["Sidenav__drawer__text--sidenav-hovered"] : null
              )}
              variant="h5"
              color="primary"
            >
              Crypto Info
            </Typography>
          </section>

          <Divider />

          <List
            className={classNames(
              styles.Sidenav__drawer__menu,
              menuHovered ? styles["Sidenav__drawer__menu--sidenav-hovered"] : null
            )}
          >
            {React.Children.toArray(
              SIDENAV_MENU_ITEMS.map((sideNavMenuItem: SideNavMenuItem) => {
                return (
                  <ListItemLink
                    className={classNames(
                      styles.Sidenav__drawer__menu__item,
                      menuHovered ? styles["Sidenav__drawer__menu__item--sidenav-hovered"] : null,
                      location.pathname === sideNavMenuItem.path
                        ? styles["Sidenav__drawer__menu__item--active-item"]
                        : null
                    )}
                    to={sideNavMenuItem.path}
                    selected={location.pathname === sideNavMenuItem.path}
                  >
                    <ListItemIcon
                      className={classNames(
                        styles.Sidenav__drawer__menu__item__icon,
                        menuHovered ? styles["Sidenav__drawer__menu__item__icon--sidenav-hovered"] : null
                      )}
                    >
                      {sideNavMenuItem.icon}
                    </ListItemIcon>
                    <ListItemText
                      className={classNames(
                        styles.Sidenav__drawer__menu__item__text,
                        styles.Sidenav__drawer__text,
                        menuHovered ? styles["Sidenav__drawer__text--sidenav-hovered"] : null
                      )}
                    >
                      {sideNavMenuItem.text}
                    </ListItemText>
                  </ListItemLink>
                );
              })
            )}
          </List>
        </Drawer>
      </Hidden>
    </nav>
  );
};

Sidenav.propTypes = {
  className: PropTypes.string,
};

Sidenav.defaultProps = {
  className: undefined,
};

export default Sidenav;
