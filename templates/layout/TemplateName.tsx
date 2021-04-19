import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import styles from "./TemplateName.module.scss";

const TemplateName: React.FC<React.HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  return (
    <div className={classNames(styles.TemplateName, props.className)} data-testid="TemplateName">
      TemplateName Component
    </div>
  );
};

TemplateName.propTypes = {
  className: PropTypes.string,
};

TemplateName.defaultProps = {
  className: undefined,
};

export default TemplateName;
