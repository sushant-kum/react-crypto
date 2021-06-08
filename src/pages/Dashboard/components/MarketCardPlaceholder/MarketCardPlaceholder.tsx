/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date Jun 08 2021 18:06:55 GMT+05:30
 * @modify date Jun 08 2021 18:06:55 GMT+05:30
 * @desc MarketCardPlaceholder
 */

import { Card, CardContent, Typography } from "@material-ui/core";
import { StarOutlineRounded } from "@material-ui/icons";
import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useContext } from "react";

import addStarThemeDarkImg from "../../../../assets/images/addStarThemeDark.svg";
import addStarThemeLightImg from "../../../../assets/images/addStarThemeLight.svg";
import DarkModeContext from "../../../../contexts/DarkMode";
import { DarkModeContextValue } from "../../../../models/DarkMode";

import styles from "./MarketCardPlaceholder.module.scss";

const MarketCardPlaceholder: React.FC<React.HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const { darkModeSelection } = useContext<DarkModeContextValue>(DarkModeContext);

  return (
    <Card className={classNames(styles.MarketCardPlaceholder, props.className)} data-testid="MarketCardPlaceholder">
      <CardContent className={styles.MarketCardPlaceholder__content}>
        <img
          className={styles.MarketCardPlaceholder__content__illustration}
          src={darkModeSelection ? addStarThemeDarkImg : addStarThemeLightImg}
          alt="Add star illustration"
        />
        <Typography className={styles.MarketCardPlaceholder__content_title} variant="body1">
          No Starred markets found
        </Typography>
        <Typography className={styles.MarketCardPlaceholder__content_text} variant="body2" color="textSecondary">
          You can star a market by clicking on the{" "}
          <StarOutlineRounded className={styles["MarketCardPlaceholder__content__text__star-icon"]} fontSize="small" />{" "}
          icon.
        </Typography>
      </CardContent>
    </Card>
  );
};

MarketCardPlaceholder.propTypes = {
  className: PropTypes.string,
};

MarketCardPlaceholder.defaultProps = {
  className: undefined,
};

export default MarketCardPlaceholder;
