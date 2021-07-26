/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date Jun 08 2021 18:06:55 GMT+05:30
 * @modify date Jul 26 2021 10:38:10 GMT+05:30
 * @desc MarketCardPlaceholder
 */

import { Card, CardContent, Typography } from "@material-ui/core";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";
import { StarOutlineRounded } from "@material-ui/icons";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";

import addStarThemeDarkImg from "../../../../assets/images/addStarThemeDark.svg";
import addStarThemeLightImg from "../../../../assets/images/addStarThemeLight.svg";
import useScreenWidth from "../../../../hooks/useScreenWidth";
import { getThemeType, ThemeType } from "../../../../store/settings/themeType";

import styles from "./MarketCardPlaceholder.module.scss";

const MarketCardPlaceholder: React.FC<React.HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const SM_AND_BELOW_SCREEN_WIDTHS: Breakpoint[] = ["xs", "sm"];

  const screenWidth: Breakpoint = useScreenWidth();
  const themeType: ThemeType = useSelector(getThemeType);

  return (
    <Card
      className={classNames(styles.MarketCardPlaceholder, props.className)}
      elevation={0}
      data-testid="MarketCardPlaceholder"
    >
      <CardContent className={styles.MarketCardPlaceholder__content}>
        <img
          className={styles.MarketCardPlaceholder__content__illustration}
          src={themeType === "dark" ? addStarThemeDarkImg : addStarThemeLightImg}
          width={SM_AND_BELOW_SCREEN_WIDTHS.includes(screenWidth) ? 95 : 134.5}
          height={SM_AND_BELOW_SCREEN_WIDTHS.includes(screenWidth) ? 95 : 134.5}
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
