/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date May 16 2021 21:23:21 GMT+05:30
 * @modify date May 21 2021 12:34:51 GMT+05:30
 * @desc Dashboard component
 */

import { AppBar, IconButton, InputAdornment, Paper, Tab, Tabs, TextField, Tooltip, useTheme } from "@material-ui/core";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";
import { ClearRounded, SearchRounded, StarRounded } from "@material-ui/icons";
import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";

import TabPanel from "../../components/TabPanel/TabPanel";
import useScreenWidth from "../../hooks/useScreenWidth";

import styles from "./Dashboard.module.scss";

enum MarketsTabIndexValues {
  STARRED = 0,
  INR = 1,
  USDT = 2,
}

const Dashboard: React.FC<React.HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const theme = useTheme();
  const screenWidth: Breakpoint = useScreenWidth();
  const [searchInputvalue, searchInputvalueSet] = useState<string>("");
  const [marketsTabIndex, marketsTabIndexSet] = useState<MarketsTabIndexValues>(MarketsTabIndexValues.STARRED);
  const smallScreenWidths: Breakpoint[] = ["xs", "sm"];

  const handleSearchInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void = (event) => {
    searchInputvalueSet(event.target.value);
  };

  const handleMarketsTabIndexChange: (event: React.ChangeEvent<unknown>, index: MarketsTabIndexValues) => void = (
    event,
    index
  ) => {
    marketsTabIndexSet(index);
  };

  const handleChangeIndex: (index: number) => void = (index) => {
    marketsTabIndexSet(index);
  };

  return (
    <section className={classNames(styles.Dashboard, props.className)} data-testid="Dashboard">
      <Paper className={styles.Dashboard__markets} elevation={0}>
        <AppBar className={styles.Dashboard__markets__header} position="static" elevation={0} color="default">
          <TextField
            className={classNames(
              styles["Dashboard__markets__header__input-search"],
              smallScreenWidths.includes(screenWidth)
                ? styles["Dashboard__markets__header__input-search--small-screen"]
                : styles["Dashboard__markets__header__input-search--large-screen"]
            )}
            label="Search"
            size="small"
            value={searchInputvalue}
            variant={smallScreenWidths.includes(screenWidth) ? "outlined" : "standard"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {searchInputvalue ? (
                    <Tooltip arrow title="Clear">
                      <IconButton
                        aria-label="clear search input"
                        size="small"
                        color="primary"
                        onClick={() => searchInputvalueSet("")}
                        onMouseDown={() => searchInputvalueSet("")}
                      >
                        <ClearRounded fontSize="inherit" />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <SearchRounded />
                  )}
                </InputAdornment>
              ),
            }}
            onChange={handleSearchInputChange}
          />

          <Tabs
            className={styles.Dashboard__markets__header__tabs}
            value={marketsTabIndex}
            indicatorColor="primary"
            textColor="primary"
            variant={smallScreenWidths.includes(screenWidth) ? "fullWidth" : "standard"}
            centered={smallScreenWidths.includes(screenWidth)}
            onChange={handleMarketsTabIndexChange}
          >
            <Tab icon={<StarRounded />} value={MarketsTabIndexValues.STARRED} />
            <Tab label="INR" value={MarketsTabIndexValues.INR} />
            <Tab label="USDT" value={MarketsTabIndexValues.USDT} />
          </Tabs>
        </AppBar>

        <SwipeableViews
          enableMouseEvents={smallScreenWidths.includes(screenWidth)}
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={marketsTabIndex}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={marketsTabIndex} index={MarketsTabIndexValues.STARRED} dir={theme.direction}>
            Starred
          </TabPanel>
          <TabPanel value={marketsTabIndex} index={MarketsTabIndexValues.INR} dir={theme.direction}>
            INR
          </TabPanel>
          <TabPanel value={marketsTabIndex} index={MarketsTabIndexValues.USDT} dir={theme.direction}>
            USDT
          </TabPanel>
        </SwipeableViews>
      </Paper>
    </section>
  );
};

Dashboard.propTypes = {
  className: PropTypes.string,
};

Dashboard.defaultProps = {
  className: undefined,
};

export default Dashboard;
