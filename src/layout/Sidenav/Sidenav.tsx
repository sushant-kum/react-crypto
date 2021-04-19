/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date Apr 19 2021 18:16:58 GMT+05:30
 * @modify date Apr 19 2021 18:16:58 GMT+05:30
 * @desc Sidenav component
 */

import { Hidden } from "@material-ui/core";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import styles from "./Sidenav.module.scss";

const Sidenav: React.FC<React.HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  return (
    <nav className={classNames(styles.Sidenav, props.className)} data-testid="Sidenav">
      {/* <Hidden smUp>Sidenav Component xsDown</Hidden> */}
      <Hidden xsDown>Sidenav Component smUp</Hidden>
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
