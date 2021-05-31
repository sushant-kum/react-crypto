/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date May 16 2021 21:23:21 GMT+05:30
 * @modify date May 31 2021 13:09:24 GMT+05:30
 * @desc Dashboard component
 */

import {
  AppBar,
  Badge,
  CircularProgress,
  createStyles,
  IconButton,
  InputAdornment,
  Paper,
  Tab,
  Tabs,
  TextField,
  Theme,
  Tooltip,
  Typography,
  useTheme,
  withStyles,
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
import localForage from "localforage";
import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";

import TabPanel from "../../components/TabPanel/TabPanel";
import buyUCoinApiEndpoint from "../../constants/BuyUCoinApi";
import coinGeckoApiEndpoint from "../../constants/CoingeckoApi";
import DarkModeContext from "../../contexts/DarkMode";
import useScreenWidth from "../../hooks/useScreenWidth";
import { DarkModeContextValue } from "../../models/DarkMode";
import LocalForageKeys from "../../models/LocalForage";

import MarketsTable from "./components/MarketsTable/MarketsTable";
import styles from "./Dashboard.module.scss";
import {
  MarketData,
  BuyUCoinTickerDataApiResponse,
  parseMarketDataApiResponse,
  CoinGeckoCoinsListApiElement,
} from "./models/MarketData";

enum MarketsTabIndexValues {
  STARRED = 0,
  INR = 1,
  USDT = 2,
}

const TabCounterBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      color: theme.palette.background.paper,
      fontSize: "0.8em",
      right: -9,
      border: `1px solid ${theme.palette.type === "dark" ? "#212121" : "#f5f5f5"}`,
    },
  })
)(Badge);

const Dashboard: React.FC<React.HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const SMALL_SCREEN_WIDTHS: Breakpoint[] = ["xs", "sm"];
  const AUTO_REFRESH_DELAY_MS = 5000;
  const AUTO_REFRESH_COUNTDOWN_UPDATE_INTERVAL_MS = 200;

  const theme = useTheme();
  const screenWidth: Breakpoint = useScreenWidth();
  const { darkModeSelection } = useContext<DarkModeContextValue>(DarkModeContext);
  const [searchInputvalue, searchInputvalueSet] = useState<string>("");
  const [autoRefresh, autoRefreshSet]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] =
    useState<boolean>(false);
  const [loadingMarketsData, loadingMarketsDataSet]: [
    boolean | undefined,
    React.Dispatch<React.SetStateAction<boolean | undefined>>
  ] = useState<boolean | undefined>(undefined);
  const [autoRefreshCountdownPerc, autoRefreshCountdownPercSet]: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ] = useState<number>(0);
  const [marketsTabIndex, marketsTabIndexSet] = useState<MarketsTabIndexValues>(MarketsTabIndexValues.STARRED);
  const [marketsData, marketsDataSet]: [MarketData[], React.Dispatch<React.SetStateAction<MarketData[]>>] = useState<
    MarketData[]
  >([]);

  const handleSearchInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void = (event) => {
    searchInputvalueSet(event.target.value);
  };

  const handleMarketsTabIndexChange: (event: React.ChangeEvent<unknown>, index: MarketsTabIndexValues) => void = (
    event,
    index
  ) => {
    marketsTabIndexSet(index);
  };

  const updateAutoRefresh: (autoRefreshMarkets: boolean) => void = (autoRefreshMarkets) => {
    localForage.setItem(LocalForageKeys.SETTINGS__GLOBAL__AUTO_REFRESH_MARKETS, autoRefreshMarkets).then(() => {
      autoRefreshSet(autoRefreshMarkets);
    });
  };

  const fetchMarketsData: () => void = () => {
    loadingMarketsDataSet(true);

    axios
      .get<BuyUCoinTickerDataApiResponse>(buyUCoinApiEndpoint.tickerData)
      .then((res: AxiosResponse<BuyUCoinTickerDataApiResponse>) => res.data)
      .then((buyUCoinMarketDataApiResponse: BuyUCoinTickerDataApiResponse) => {
        if (buyUCoinMarketDataApiResponse.status === "success" && buyUCoinMarketDataApiResponse.data.length > 0) {
          loadingMarketsDataSet(false);

          axios
            .get<CoinGeckoCoinsListApiElement[]>(coinGeckoApiEndpoint.coinsList)
            .then((res: AxiosResponse<CoinGeckoCoinsListApiElement[]>) => res.data)
            .then((coinGeckoCoinsList: CoinGeckoCoinsListApiElement[]) => {
              localForage
                .getItem<string[]>(LocalForageKeys.SETTINGS__GLOBAL__STARRED_MARKETS)
                .then((starredMarkets: string[] | null) => {
                  marketsDataSet(
                    parseMarketDataApiResponse(
                      buyUCoinMarketDataApiResponse,
                      coinGeckoCoinsList,
                      Array.isArray(starredMarkets) ? starredMarkets : []
                    )
                  );
                });
            })
            .catch(() => {
              loadingMarketsDataSet(false);
            });
        }
      })
      .catch(() => {
        loadingMarketsDataSet(false);
      });
  };

  const filterMarketData: (forTab: MarketsTabIndexValues) => MarketData[] = (forTab) => {
    return marketsData !== undefined
      ? marketsData.filter((marketData: MarketData) => {
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
        })
      : [];
  };

  const setMarketStar: (market: string, starred: boolean) => void = (market, starred) => {
    marketsDataSet((currentMarketsData: MarketData[] | undefined) => {
      const currentMarketsDataCopy: MarketData[] = JSON.parse(JSON.stringify(currentMarketsData));

      currentMarketsDataCopy.forEach((marketData: MarketData) => {
        if (marketData.name.market === market) {
          // eslint-disable-next-line no-param-reassign
          marketData.starred = starred;
        }
      });

      localForage.setItem(
        LocalForageKeys.SETTINGS__GLOBAL__STARRED_MARKETS,
        currentMarketsDataCopy
          .filter((marketData: MarketData) => marketData.starred)
          .map((marketData: MarketData) => marketData.name.market)
      );

      return currentMarketsDataCopy;
    });
  };

  useEffect(() => {
    localForage.getItem<boolean>(LocalForageKeys.SETTINGS__GLOBAL__AUTO_REFRESH_MARKETS).then((autoRefreshMarkets) => {
      if (typeof autoRefreshMarkets === "boolean") {
        autoRefreshSet(autoRefreshMarkets);
      }
    });
  }, []);

  useEffect(() => {
    if (loadingMarketsData === undefined) {
      fetchMarketsData();
    }

    if (autoRefresh && loadingMarketsData === false) {
      autoRefreshCountdownPercSet(100);

      const autoRefreshCountdownPercInterval: NodeJS.Timeout = setInterval(() => {
        autoRefreshCountdownPercSet(
          (value: number) => value - (AUTO_REFRESH_COUNTDOWN_UPDATE_INTERVAL_MS / AUTO_REFRESH_DELAY_MS) * 100
        );
      }, AUTO_REFRESH_COUNTDOWN_UPDATE_INTERVAL_MS);

      setTimeout(() => {
        clearInterval(autoRefreshCountdownPercInterval);
        fetchMarketsData();
      }, AUTO_REFRESH_DELAY_MS);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoRefresh, loadingMarketsData]);

  return (
    <section className={classNames(styles.Dashboard, props.className)} data-testid="Dashboard">
      <section className={styles["Dashboard__page-title"]}>
        <Typography variant="h4" component="h1">
          Dashboard
        </Typography>
        <div
          className={classNames(
            styles["Dashboard__page-title__bottom-spacer"],
            darkModeSelection
              ? styles["Dashboard__page-title__bottom-spacer--dark"]
              : styles["Dashboard__page-title__bottom-spacer--light"]
          )}
        />
      </section>

      <Paper className={styles.Dashboard__markets} elevation={0}>
        <AppBar className={styles.Dashboard__markets__header} position="static" elevation={0} color="default">
          <section
            className={classNames(
              styles.Dashboard__markets__header__toolbar,
              SMALL_SCREEN_WIDTHS.includes(screenWidth)
                ? styles["Dashboard__markets__header__toolbar--small-screen"]
                : styles["Dashboard__markets__header__toolbar--large-screen"]
            )}
          >
            <TextField
              className={styles["Dashboard__markets__header__toolbar__input-search"]}
              label="Search"
              size="small"
              value={searchInputvalue}
              variant={SMALL_SCREEN_WIDTHS.includes(screenWidth) ? "outlined" : "standard"}
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

            <Tooltip arrow title={`${autoRefresh ? "Disable" : "Enable"} auto refresh`}>
              <div className={styles["Dashboard__markets__header__toolbar__btn-auto-refresh"]}>
                {(autoRefresh || autoRefreshCountdownPerc !== 0) && (
                  <CircularProgress
                    className={classNames(
                      styles["Dashboard__markets__header__toolbar__btn-auto-refresh__progress"],
                      !SMALL_SCREEN_WIDTHS.includes(screenWidth) &&
                        styles["Dashboard__markets__header__toolbar__btn-auto-refresh__progress--large-screen"]
                    )}
                    size={SMALL_SCREEN_WIDTHS.includes(screenWidth) ? 30 : 40}
                    thickness={3}
                    variant="determinate"
                    value={autoRefreshCountdownPerc}
                  />
                )}

                <IconButton
                  className={styles["Dashboard__markets__header__toolbar__btn-auto-refresh"]}
                  aria-label="clear search input"
                  size={SMALL_SCREEN_WIDTHS.includes(screenWidth) ? "small" : "medium"}
                  color="primary"
                  disabled={loadingMarketsData}
                  onClick={() => updateAutoRefresh(!autoRefresh)}
                >
                  {autoRefresh ? <PauseRounded /> : <PlayArrowRounded />}
                </IconButton>
              </div>
            </Tooltip>

            <Tooltip arrow title="Manual refresh">
              <span>
                <IconButton
                  className={classNames(
                    styles["Dashboard__markets__header__toolbar__btn-refresh"],
                    loadingMarketsData && styles["Dashboard__markets__header__toolbar__btn-refresh--spinning"]
                  )}
                  aria-label="clear search input"
                  size={SMALL_SCREEN_WIDTHS.includes(screenWidth) ? "small" : "medium"}
                  color="primary"
                  disabled={autoRefresh || loadingMarketsData}
                  onClick={() => fetchMarketsData()}
                >
                  <CachedRounded />
                </IconButton>
              </span>
            </Tooltip>
          </section>

          <Tabs
            className={styles.Dashboard__markets__header__tabs}
            value={marketsTabIndex}
            indicatorColor="primary"
            textColor="primary"
            variant={SMALL_SCREEN_WIDTHS.includes(screenWidth) ? "fullWidth" : "standard"}
            centered={SMALL_SCREEN_WIDTHS.includes(screenWidth)}
            onChange={handleMarketsTabIndexChange}
          >
            <Tab
              icon={
                <TabCounterBadge
                  badgeContent={filterMarketData(MarketsTabIndexValues.STARRED).length}
                  color="secondary"
                >
                  <StarRounded />
                </TabCounterBadge>
              }
              value={MarketsTabIndexValues.STARRED}
            />
            <Tab
              label={
                <TabCounterBadge badgeContent={filterMarketData(MarketsTabIndexValues.INR).length} color="secondary">
                  INR
                </TabCounterBadge>
              }
              value={MarketsTabIndexValues.INR}
            />
            <Tab
              label={
                <TabCounterBadge badgeContent={filterMarketData(MarketsTabIndexValues.USDT).length} color="secondary">
                  USDT
                </TabCounterBadge>
              }
              value={MarketsTabIndexValues.USDT}
            />
          </Tabs>
        </AppBar>

        <TabPanel
          className={styles.Dashboard__markets__tabpanel}
          classes={{
            box: styles.Dashboard__markets__tabpanel__box,
          }}
          value={marketsTabIndex}
          index={MarketsTabIndexValues.STARRED}
          dir={theme.direction}
        >
          {marketsData && (
            <MarketsTable
              marketsData={filterMarketData(MarketsTabIndexValues.STARRED)}
              category="Starred"
              loadingMarketsData={loadingMarketsData ?? false}
              setMarketStar={setMarketStar}
            />
          )}
        </TabPanel>
        <TabPanel
          className={styles.Dashboard__markets__tabpanel}
          classes={{
            box: styles.Dashboard__markets__tabpanel__box,
          }}
          value={marketsTabIndex}
          index={MarketsTabIndexValues.INR}
          dir={theme.direction}
        >
          {marketsData && (
            <MarketsTable
              marketsData={filterMarketData(MarketsTabIndexValues.INR)}
              category="INR"
              loadingMarketsData={loadingMarketsData ?? false}
              setMarketStar={setMarketStar}
            />
          )}
        </TabPanel>
        <TabPanel
          className={styles.Dashboard__markets__tabpanel}
          classes={{
            box: styles.Dashboard__markets__tabpanel__box,
          }}
          value={marketsTabIndex}
          index={MarketsTabIndexValues.USDT}
          dir={theme.direction}
        >
          {marketsData && (
            <MarketsTable
              marketsData={filterMarketData(MarketsTabIndexValues.USDT)}
              category="USDT"
              loadingMarketsData={loadingMarketsData ?? false}
              setMarketStar={setMarketStar}
            />
          )}
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
