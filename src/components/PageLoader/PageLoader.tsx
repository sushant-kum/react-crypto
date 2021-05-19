/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date May 19 2021 12:54:44 GMT+05:30
 * @modify date May 19 2021 12:54:44 GMT+05:30
 * @desc PageLoader component
 */

import { CircularProgress } from "@material-ui/core";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import styles from "./PageLoader.module.scss";

const PageLoader: React.FC<React.HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  return (
    <div className={classNames(styles.PageLoader, props.className)} data-testid="PageLoader">
      <CircularProgress />
    </div>
  );
};

PageLoader.propTypes = {
  className: PropTypes.string,
};

PageLoader.defaultProps = {
  className: undefined,
};

export default PageLoader;
