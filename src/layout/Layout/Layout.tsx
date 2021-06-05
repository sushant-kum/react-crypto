/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date Apr 19 2021 18:16:12 GMT+05:30
 * @modify date May 21 2021 12:34:43 GMT+05:30
 * @desc Layout component
 */

import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useState } from "react";

import XsSideNavOpenContext, { xsSideNavOpenInitialState } from "../../contexts/XsSideNavOpen";
import { XsSideNavOpen } from "../../models/XsSideNavOpen";

import Header from "./components/Header/Header";
import Sidenav from "./components/Sidenav/Sidenav";
import styles from "./Layout.module.scss";

const Layout: React.FC<React.HTMLAttributes<HTMLElement>> = ({ children, ...props }) => {
  const [xsSideNavOpen, xsSideNavOpenSet] = useState<XsSideNavOpen>(xsSideNavOpenInitialState.xsSideNavOpen);
  const xsSideNavOpenUpdate: (state: boolean) => void = (state) => {
    xsSideNavOpenSet(state);
  };

  return (
    <section
      className={classNames(
        styles.Layout,
        props.className,
        xsSideNavOpen ? styles["Layout--xs-sidenav-open"] : styles["Layout--xs-sidenav-close"]
      )}
      data-testid="Layout"
    >
      <XsSideNavOpenContext.Provider value={{ xsSideNavOpen, xsSideNavOpenUpdate }}>
        <Header className={styles.Layout__header} />
        <Sidenav className={styles.Layout__sidenav} />
      </XsSideNavOpenContext.Provider>
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
