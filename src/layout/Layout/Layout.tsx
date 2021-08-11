/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date Apr 19 2021 18:16:12 GMT+05:30
 * @modify date Aug 11 2021 21:04:31 GMT+05:30
 * @desc Layout component
 */

import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";

import { getXsSideNavStateSelector, XsSideNavState } from "../../store/appStates/xsSideNavState";

import Header from "./components/Header/Header";
import Sidenav from "./components/Sidenav/Sidenav";
import styles from "./Layout.module.scss";

const Layout: React.FC<React.HTMLAttributes<HTMLElement>> = ({ children, ...props }) => {
  const xsSideNavState: XsSideNavState = useSelector(getXsSideNavStateSelector);

  return (
    <section
      className={classNames(
        styles.Layout,
        props.className,
        xsSideNavState === "open" ? styles["Layout--xs-sidenav-open"] : styles["Layout--xs-sidenav-close"]
      )}
      data-testid="Layout"
    >
      <Header className={styles.Layout__header} />
      <Sidenav className={styles.Layout__sidenav} />
      <main className={styles.Layout__content}>{children}</main>
    </section>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Layout.defaultProps = {
  className: undefined,
};

export default Layout;
