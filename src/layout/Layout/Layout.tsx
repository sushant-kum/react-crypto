/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date Apr 19 2021 18:16:12 GMT+05:30
 * @modify date Apr 19 2021 18:16:12 GMT+05:30
 * @desc Layout component
 */

import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import Header from "../Header/Header";
import Sidenav from "../Sidenav/Sidenav";

import styles from "./Layout.module.scss";

const Layout: React.FC<React.HTMLAttributes<HTMLElement>> = ({ children, ...props }) => {
  return (
    <section className={classNames(styles.Layout, props.className)} data-testid="Layout">
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
