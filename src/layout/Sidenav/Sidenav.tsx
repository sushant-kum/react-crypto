/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date Apr 19 2021 18:16:58 GMT+05:30
 * @modify date Apr 20 2021 19:48:46 GMT+05:30
 * @desc Sidenav component
 */

import {
  Divider,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Typography,
} from "@material-ui/core";
import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";

import logo from "../../assets/images/logo.svg";
import SIDENAV_MENU_ITEMS from "../../constants/SideNav";
import XsSideNavOpenContext from "../../contexts/XsSideNavOpen";
import { SideNavMenuItem } from "../../models/SideNavMenuItem";
import { XsSideNavOpenContextValue } from "../../models/XsSideNavOpen";

import styles from "./Sidenav.module.scss";

const Sidenav: React.FC<React.HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const location = useLocation();
  const { xsSideNavOpen, xsSideNavOpenUpdate } = useContext<XsSideNavOpenContextValue>(XsSideNavOpenContext);
  const [menuHovered, menuHoveredSet]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(
    false
  );

  return (
    <nav className={classNames(styles.Sidenav, props.className)} data-testid="Sidenav">
      <Hidden smUp>
        <SwipeableDrawer
          className={classNames(styles.Sidenav__drawer, styles["Sidenav__drawer--xs"])}
          classes={{
            paper: classNames(styles.Sidenav__drawer__paper, styles["Sidenav__drawer__paper--xs"]),
          }}
          anchor="left"
          open={xsSideNavOpen}
          onOpen={() => xsSideNavOpenUpdate?.(true)}
          onClose={() => xsSideNavOpenUpdate?.(false)}
        >
          <section className={classNames(styles.Sidenav__drawer__header, styles["Sidenav__drawer__header--xs"])}>
            <img className={styles.Sidenav__drawer__header__logo} src={logo} width="40" height="40" alt="Crypto Info" />
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
            {SIDENAV_MENU_ITEMS.map((sideNavMenuItem: SideNavMenuItem) => {
              return (
                <ListItem
                  className={classNames(
                    styles.Sidenav__drawer__menu__item,
                    styles["Sidenav__drawer__menu__item--xs"],
                    location.pathname === sideNavMenuItem.path
                      ? styles["Sidenav__drawer__menu__item--active-item"]
                      : null
                  )}
                  button
                  component="a"
                  href={sideNavMenuItem.path}
                  selected={location.pathname === sideNavMenuItem.path}
                  key={sideNavMenuItem.text}
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
                </ListItem>
              );
            })}
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
            <img className={styles.Sidenav__drawer__header__logo} src={logo} width="40" height="40" alt="Crypto Info" />
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
            {SIDENAV_MENU_ITEMS.map((sideNavMenuItem: SideNavMenuItem) => {
              return (
                <ListItem
                  className={classNames(
                    styles.Sidenav__drawer__menu__item,
                    menuHovered ? styles["Sidenav__drawer__menu__item--sidenav-hovered"] : null,
                    location.pathname === sideNavMenuItem.path
                      ? styles["Sidenav__drawer__menu__item--active-item"]
                      : null
                  )}
                  button
                  component="a"
                  href={sideNavMenuItem.path}
                  selected={location.pathname === sideNavMenuItem.path}
                  key={sideNavMenuItem.text}
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
                      styles.Sidenav__drawer__text,
                      menuHovered ? styles["Sidenav__drawer__text--sidenav-hovered"] : null
                    )}
                  >
                    {sideNavMenuItem.text}
                  </ListItemText>
                </ListItem>
              );
            })}
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
