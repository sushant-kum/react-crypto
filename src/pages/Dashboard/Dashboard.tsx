/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date May 16 2021 21:23:21 GMT+05:30
 * @modify date May 22 2021 14:28:10 GMT+05:30
 * @desc Dashboard component
 */

import {
  AppBar,
  CircularProgress,
  IconButton,
  InputAdornment,
  Paper,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  useTheme,
} from "@material-ui/core";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";
import {
  CachedRounded,
  ClearRounded,
  PauseRounded,
  PlayArrowRounded,
  SearchRounded,
  StarRounded,
} from "@material-ui/icons";
import axios, { AxiosResponse } from "axios";
import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

import TabPanel from "../../components/TabPanel/TabPanel";
import buyUCoinApiEndpoint from "../../constants/BuyUCoinApi";
import useScreenWidth from "../../hooks/useScreenWidth";
import { MarketData, MarketDataApiResponse, parseMarketDataApiResponse } from "../../models/MarketData";

import styles from "./Dashboard.module.scss";

enum MarketsTabIndexValues {
  STARRED = 0,
  INR = 1,
  USDT = 2,
}

const Dashboard: React.FC<React.HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const AUTO_REFRESH_DELAY_MS = 5000;
  const AUTO_REFRESH_PROGRESS_INTREVAL_MS = 200;

  const theme = useTheme();
  const screenWidth: Breakpoint = useScreenWidth();
  const [searchInputvalue, searchInputvalueSet] = useState<string>("");
  const [autoRefresh, autoRefreshSet]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] =
    useState<boolean>(true);
  const [autoRefreshCountdownPerc, autoRefreshCountdownPercSet]: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ] = useState<number>(0);
  const [marketsTabIndex, marketsTabIndexSet] = useState<MarketsTabIndexValues>(MarketsTabIndexValues.STARRED);
  const [loadingMarketsData, loadingMarketsDataSet]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] =
    useState<boolean>(false);
  const [marketsData, marketsDataSet]: [
    MarketData[] | undefined,
    React.Dispatch<React.SetStateAction<MarketData[] | undefined>>
  ] = useState<MarketData[]>();
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

  const fetchMarketsData: () => void = () => {
    loadingMarketsDataSet(true);

    axios
      .get<MarketDataApiResponse>(buyUCoinApiEndpoint.tickerData)
      .then((res: AxiosResponse<MarketDataApiResponse>) => res.data)
      .then((data: MarketDataApiResponse) => {
        loadingMarketsDataSet(false);

        if (data.status === "success") {
          marketsDataSet(parseMarketDataApiResponse(data));
        }
      });
  };

  const filterMarketData: (forTab: MarketsTabIndexValues) => MarketData[] | undefined = (forTab) => {
    return marketsData?.filter((marketData: MarketData) => {
      let filterIn = true;

      switch (forTab) {
        case MarketsTabIndexValues.STARRED:
          if (!marketData.starred) {
            filterIn = false;
          }
          break;

        case MarketsTabIndexValues.INR:
          if (marketData.name.quotationCurrency !== "INR") {
            filterIn = false;
          }
          break;

        case MarketsTabIndexValues.USDT:
          if (marketData.name.quotationCurrency !== "USDT") {
            filterIn = false;
          }
          break;

        default:
      }

      if (
        searchInputvalue &&
        !(
          marketData.name.exchangingCurrency.toLowerCase().includes(searchInputvalue.toLowerCase()) ||
          marketData.name.quotationCurrency.toLowerCase().includes(searchInputvalue.toLowerCase())
        )
      ) {
        filterIn = false;
      }

      return filterIn;
    });
  };

  useEffect(() => {
    fetchMarketsData();
  }, []);

  useEffect(() => {
    if (marketsData !== undefined && marketsData.length > 0 && autoRefresh) {
      autoRefreshCountdownPercSet(100);

      const autoRefreshCountdownPercInterval: NodeJS.Timeout = setInterval(() => {
        autoRefreshCountdownPercSet(
          (value: number) => value - (AUTO_REFRESH_PROGRESS_INTREVAL_MS / AUTO_REFRESH_DELAY_MS) * 100
        );
      }, AUTO_REFRESH_PROGRESS_INTREVAL_MS);

      setTimeout(() => {
        clearInterval(autoRefreshCountdownPercInterval);
        fetchMarketsData();
      }, AUTO_REFRESH_DELAY_MS);
    }
  }, [marketsData, autoRefresh]);

  return (
    <section className={classNames(styles.Dashboard, props.className)} data-testid="Dashboard">
      <Paper className={styles.Dashboard__markets} elevation={0}>
        <AppBar className={styles.Dashboard__markets__header} position="static" elevation={0} color="default">
          <section
            className={classNames(
              styles.Dashboard__markets__header__toolbar,
              smallScreenWidths.includes(screenWidth)
                ? styles["Dashboard__markets__header__toolbar--small-screen"]
                : styles["Dashboard__markets__header__toolbar--large-screen"]
            )}
          >
            <TextField
              className={styles["Dashboard__markets__header__toolbar__input-search"]}
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

            <div className={styles["Dashboard__markets__header__toolbar__btn-auto-refresh"]}>
              {(autoRefresh || autoRefreshCountdownPerc !== 0) && (
                <CircularProgress
                  className={classNames(
                    styles["Dashboard__markets__header__toolbar__btn-auto-refresh__progress"],
                    !smallScreenWidths.includes(screenWidth) &&
                      styles["Dashboard__markets__header__toolbar__btn-auto-refresh__progress--large-screen"]
                  )}
                  size={smallScreenWidths.includes(screenWidth) ? 30 : 40}
                  thickness={3}
                  variant="determinate"
                  value={autoRefreshCountdownPerc}
                />
              )}

              <Tooltip arrow title={`${autoRefresh ? "Disable" : "Enable"} auto refresh`}>
                <IconButton
                  aria-label="clear search input"
                  size={smallScreenWidths.includes(screenWidth) ? "small" : "medium"}
                  color="primary"
                  onClick={() => autoRefreshSet((currentAutoRefresh: boolean) => !currentAutoRefresh)}
                >
                  {autoRefresh ? <PauseRounded /> : <PlayArrowRounded />}
                </IconButton>
              </Tooltip>
            </div>

            <Tooltip arrow title="Manual refresh">
              <IconButton
                className={classNames(
                  styles["Dashboard__markets__header__toolbar__btn-refresh"],
                  loadingMarketsData && styles["Dashboard__markets__header__toolbar__btn-refresh--spinning"]
                )}
                aria-label="clear search input"
                size={smallScreenWidths.includes(screenWidth) ? "small" : "medium"}
                color="primary"
                disabled={autoRefresh || autoRefreshCountdownPerc !== 0 || loadingMarketsData}
                onClick={() => fetchMarketsData()}
              >
                <CachedRounded />
              </IconButton>
            </Tooltip>
          </section>

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

        <TabPanel value={marketsTabIndex} index={MarketsTabIndexValues.STARRED} dir={theme.direction}>
          {marketsData && JSON.stringify(filterMarketData(MarketsTabIndexValues.STARRED))}
        </TabPanel>
        <TabPanel value={marketsTabIndex} index={MarketsTabIndexValues.INR} dir={theme.direction}>
          {marketsData && JSON.stringify(filterMarketData(MarketsTabIndexValues.INR))}
        </TabPanel>
        <TabPanel value={marketsTabIndex} index={MarketsTabIndexValues.USDT} dir={theme.direction}>
          {marketsData && JSON.stringify(filterMarketData(MarketsTabIndexValues.USDT))}
        </TabPanel>
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
