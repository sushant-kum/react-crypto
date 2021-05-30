/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date May 16 2021 21:15:16 GMT+05:30
 * @modify date May 16 2021 21:15:16 GMT+05:30
 * @desc TabPanel component
 */

import { Box } from "@material-ui/core";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import styles from "./TabPanel.module.scss";

interface TabPanelProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  classes?: {
    box?: string | null;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  index: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  dir?: string;
}

const TabPanel: React.FC<TabPanelProps> = ({ classes, children, index, value, dir, ...props }) => {
  return (
    <div
      id={`tabpanel-${index}`}
      className={classNames(styles.TabPanel, props.className)}
      role="tabpanel"
      hidden={value !== index}
      aria-labelledby={`full-width-tab-${index}`}
      data-testid="TabPanel"
    >
      {value === index && (
        <Box className={classNames(styles.TabPanel__box, classes?.box)} p={3}>
          {children}
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.exact({
    box: PropTypes.string,
  }),
  // eslint-disable-next-line react/forbid-prop-types
  index: PropTypes.any.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  value: PropTypes.any.isRequired,
  dir: PropTypes.string,
  className: PropTypes.string,
};

TabPanel.defaultProps = {
  children: undefined,
  classes: undefined,
  dir: "ltr",
  className: undefined,
};

export default TabPanel;
