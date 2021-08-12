/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date May 16 2021 21:23:21 GMT+05:30
 * @modify date Aug 12 2021 14:05:59 GMT+05:30
 * @desc Dashboard component
 */

import {
  AppBar,
  Badge,
  CircularProgress,
  createStyles,
  Fab,
  IconButton,
  InputAdornment,
  Paper,
  Tab,
  Tabs,
  TextField,
  Theme,
  Typography,
  useTheme,
  withStyles,
} from "@material-ui/core";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";
import {
  ArrowBackRounded,
  ArrowForwardRounded,
  CachedRounded,
  ClearRounded,
  PauseRounded,
  PlayArrowRounded,
  SearchRounded,
  StarRounded,
} from "@material-ui/icons";
import classNames from "classnames";
import localforage from "localforage";
import PropTypes from "prop-types";
import React, { Dispatch, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StringParam, useQueryParam } from "use-query-params";

import CustomTooltip from "../../components/CustomTooltip/CustomTooltip";
import TabPanel from "../../components/TabPanel/TabPanel";
import useScreenWidth from "../../hooks/useScreenWidth";
import LocalForageKeys from "../../models/LocalForage";
import { StoreDispatch } from "../../store";
import { setAppSubtitle } from "../../store/appStates/appSubTitle";
import {
  fetchMarketsData,
  getAllMarketsDataSelector,
  getMarketsDataLoadingSelector,
} from "../../store/data/marketsData";
import { getAutoRefreshMarketsSelector, setAutoRefreshMarkets } from "../../store/settings/autoRefreshMarkets";
import { getThemeTypeSelector, ThemeType } from "../../store/settings/themeType";

import MarketCard from "./components/MarketCard/MarketCard";
import MarketCardPlaceholder from "./components/MarketCardPlaceholder/MarketCardPlaceholder";
import MarketsTable from "./components/MarketsTable/MarketsTable";
import styles from "./Dashboard.module.scss";
import { MarketData } from "./models/MarketData";

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
  const SM_AND_BELOW_SCREEN_WIDTHS: Breakpoint[] = ["xs", "sm"];
  const AUTO_REFRESH_DELAY_MS = 20000;
  const AUTO_REFRESH_COUNTDOWN_UPDATE_INTERVAL_MS = 200;

  const theme = useTheme();
  const dispatch: Dispatch<StoreDispatch> = useDispatch<Dispatch<StoreDispatch>>();
  const marketsData: MarketData[] = useSelector(getAllMarketsDataSelector);
  const loadingMarketsData: boolean | undefined = useSelector(getMarketsDataLoadingSelector);
  const [queryParamTab, queryParamTabSet] = useQueryParam("tab", StringParam);
  const screenWidth: Breakpoint = useScreenWidth();
  const themeType: ThemeType = useSelector(getThemeTypeSelector);
  const autoRefreshMarkets: boolean = useSelector(getAutoRefreshMarketsSelector);
  const refStarredMarketTiles: React.MutableRefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null);
  const [searchInputvalue, searchInputvalueSet] = useState<string>("");
  const [autoRefreshCountdownPerc, autoRefreshCountdownPercSet]: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ] = useState<number>(0);
  const [marketsTabIndex, marketsTabIndexSet] = useState<MarketsTabIndexValues>(
    (queryParamTab &&
      (MarketsTabIndexValues[queryParamTab.toUpperCase() as never] as unknown as MarketsTabIndexValues)) ||
      MarketsTabIndexValues.STARRED
  );

  const scrollStarrtedMarketsTiles: (direction: "previous" | "next") => void = (direction) => {
    const offset: number = (SM_AND_BELOW_SCREEN_WIDTHS.includes(screenWidth) ? 300 : 350) + 16;

    if (refStarredMarketTiles?.current) {
      if (direction === "next") {
        refStarredMarketTiles.current.scrollLeft += offset;
      }
      if (direction === "previous") {
        refStarredMarketTiles.current.scrollLeft -= offset;
      }
    }
  };

  const handleSearchInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void = (event) => {
    searchInputvalueSet(event.target.value);
  };

  const handleMarketsTabIndexChange: (event: React.ChangeEvent<unknown>, index: MarketsTabIndexValues) => void = (
    event,
    index
  ) => {
    marketsTabIndexSet(index);
  };

  const updateAutoRefresh: (autoRefresh: boolean) => void = (autoRefresh) => {
    dispatch(setAutoRefreshMarkets(autoRefresh));
  };

  const filterMarketData: (forTab: MarketsTabIndexValues, skipSearchInput?: boolean) => MarketData[] = (
    forTab,
    skipSearchInput
  ) => {
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
            !skipSearchInput &&
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

  const filterMarketNames: (forTab: MarketsTabIndexValues, skipSearchInput?: boolean) => string[] = (
    forTab,
    skipSearchInput
  ) => {
    return marketsData !== undefined
      ? marketsData
          .filter((marketData: MarketData) => {
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
              !skipSearchInput &&
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
          .map((filteredMarketData: MarketData) => filteredMarketData.name.market)
      : [];
  };

  useEffect(() => {
    localforage.getItem<boolean>(LocalForageKeys.SETTINGS__GLOBAL__AUTO_REFRESH_MARKETS).then((autoRefresh) => {
      if (autoRefresh !== undefined && autoRefresh !== null) {
        dispatch(setAutoRefreshMarkets(autoRefresh));
      }
    });

    dispatch(setAppSubtitle("Dashboard"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (loadingMarketsData === undefined) {
      dispatch(fetchMarketsData());
    }

    if (autoRefreshMarkets && loadingMarketsData === false) {
      autoRefreshCountdownPercSet(100);

      const autoRefreshCountdownPercInterval: NodeJS.Timeout = setInterval(() => {
        autoRefreshCountdownPercSet(
          (value: number) => value - (AUTO_REFRESH_COUNTDOWN_UPDATE_INTERVAL_MS / AUTO_REFRESH_DELAY_MS) * 100
        );
      }, AUTO_REFRESH_COUNTDOWN_UPDATE_INTERVAL_MS);

      setTimeout(() => {
        clearInterval(autoRefreshCountdownPercInterval);
        dispatch(fetchMarketsData());
      }, AUTO_REFRESH_DELAY_MS);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoRefreshMarkets, loadingMarketsData]);

  useEffect(() => {
    if (marketsTabIndex !== undefined) {
      const selectedTab: string = MarketsTabIndexValues[marketsTabIndex].toLowerCase();

      queryParamTabSet(selectedTab);
    } else {
      queryParamTabSet(undefined);
    }
  }, [marketsTabIndex, queryParamTab, queryParamTabSet]);

  return (
    <section className={classNames(styles.Dashboard, props.className)} data-testid="Dashboard">
      <section className={styles["Dashboard__page-title"]}>
        <Typography variant="h4" component="h1">
          Dashboard
        </Typography>
      </section>

      <section className={styles["Dashboard__starred-market-tiles"]} ref={refStarredMarketTiles}>
        <div
          className={classNames(
            styles["Dashboard__starred-market-tiles__container"],
            marketsData.length === 0 &&
              loadingMarketsData &&
              styles["Dashboard__starred-market-tiles__container--loading-data"]
          )}
        >
          {marketsData.length === 0 && loadingMarketsData ? (
            <div className={styles["Dashboard__starred-market-tiles__container__loader"]}>
              <CircularProgress />
            </div>
          ) : (
            <>
              {marketsData.filter((marketData: MarketData) => marketData.starred).length === 0 ? (
                <MarketCardPlaceholder />
              ) : (
                React.Children.toArray(
                  marketsData
                    .filter((marketData: MarketData) => marketData.starred)
                    .map((starredMarketData: MarketData) => <MarketCard marketName={starredMarketData.name.market} />)
                )
              )}
            </>
          )}
        </div>
      </section>

      <section
        className={styles["Dashboard__starred-market-tiles-nav-btns"]}
        hidden={
          marketsData.filter((marketData: MarketData) => marketData.starred).length === 0 ||
          (refStarredMarketTiles?.current !== null &&
            refStarredMarketTiles.current.offsetWidth >=
              marketsData.filter((marketData: MarketData) => marketData.starred).length *
                ((SM_AND_BELOW_SCREEN_WIDTHS.includes(screenWidth) ? 300 : 350) + 16))
        }
      >
        <Fab
          className={classNames(
            styles["Dashboard__starred-market-tiles-nav-btns__btn-navigate"],
            styles["Dashboard__starred-market-tiles-nav-btns__btn-navigate--previous"]
          )}
          color="primary"
          size="small"
          onClick={() => scrollStarrtedMarketsTiles("previous")}
        >
          <ArrowBackRounded />
        </Fab>

        <Fab
          className={classNames(
            styles["Dashboard__starred-market-tiles-nav-btns__btn-navigate"],
            styles["Dashboard__starred-market-tiles-nav-btns__btn-navigate--next"]
          )}
          color="primary"
          size="small"
          onClick={() => scrollStarrtedMarketsTiles("next")}
        >
          <ArrowForwardRounded />
        </Fab>
      </section>

      <div
        className={classNames(
          styles["Dashboard__markets-top-spacer"],
          themeType === "dark"
            ? styles["Dashboard__markets-top-spacer--theme-dark"]
            : styles["Dashboard__markets-top-spacer--theme-light"]
        )}
      />

      <Paper className={styles.Dashboard__markets} elevation={0}>
        <AppBar className={styles.Dashboard__markets__header} position="static" elevation={0} color="default">
          <section
            className={classNames(
              styles.Dashboard__markets__header__toolbar,
              SM_AND_BELOW_SCREEN_WIDTHS.includes(screenWidth)
                ? styles["Dashboard__markets__header__toolbar--small-screen"]
                : styles["Dashboard__markets__header__toolbar--large-screen"]
            )}
          >
            <TextField
              className={styles["Dashboard__markets__header__toolbar__input-search"]}
              label="Search"
              size="small"
              value={searchInputvalue}
              variant={SM_AND_BELOW_SCREEN_WIDTHS.includes(screenWidth) ? "outlined" : "standard"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {searchInputvalue ? (
                      <CustomTooltip
                        title={
                          <Typography variant="body2" component="span">
                            Clear
                          </Typography>
                        }
                        arrow
                      >
                        <IconButton
                          aria-label="clear search input"
                          size="small"
                          color="primary"
                          onClick={() => searchInputvalueSet("")}
                          onMouseDown={() => searchInputvalueSet("")}
                        >
                          <ClearRounded fontSize="inherit" />
                        </IconButton>
                      </CustomTooltip>
                    ) : (
                      <SearchRounded />
                    )}
                  </InputAdornment>
                ),
              }}
              onChange={handleSearchInputChange}
            />

            <CustomTooltip
              title={
                <Typography variant="body2" component="span">
                  {autoRefreshMarkets ? "Disable" : "Enable"} auto refresh
                </Typography>
              }
              arrow
            >
              <div className={styles["Dashboard__markets__header__toolbar__btn-auto-refresh"]}>
                {(autoRefreshMarkets || autoRefreshCountdownPerc !== 0) && (
                  <CircularProgress
                    className={classNames(
                      styles["Dashboard__markets__header__toolbar__btn-auto-refresh__progress"],
                      !SM_AND_BELOW_SCREEN_WIDTHS.includes(screenWidth) &&
                        styles["Dashboard__markets__header__toolbar__btn-auto-refresh__progress--large-screen"]
                    )}
                    size={SM_AND_BELOW_SCREEN_WIDTHS.includes(screenWidth) ? 30 : 40}
                    thickness={3}
                    variant="determinate"
                    value={autoRefreshCountdownPerc}
                  />
                )}

                <IconButton
                  className={styles["Dashboard__markets__header__toolbar__btn-auto-refresh"]}
                  aria-label="clear search input"
                  size={SM_AND_BELOW_SCREEN_WIDTHS.includes(screenWidth) ? "small" : "medium"}
                  color="primary"
                  disabled={loadingMarketsData}
                  onClick={() => updateAutoRefresh(!autoRefreshMarkets)}
                >
                  {autoRefreshMarkets ? <PauseRounded /> : <PlayArrowRounded />}
                </IconButton>
              </div>
            </CustomTooltip>

            <CustomTooltip
              title={
                <Typography variant="body2" component="span">
                  Manual refresh
                </Typography>
              }
              arrow
            >
              <span>
                <IconButton
                  className={classNames(
                    styles["Dashboard__markets__header__toolbar__btn-refresh"],
                    loadingMarketsData && styles["Dashboard__markets__header__toolbar__btn-refresh--spinning"]
                  )}
                  aria-label="clear search input"
                  size={SM_AND_BELOW_SCREEN_WIDTHS.includes(screenWidth) ? "small" : "medium"}
                  color="primary"
                  disabled={autoRefreshMarkets || loadingMarketsData}
                  onClick={() => dispatch(fetchMarketsData())}
                >
                  <CachedRounded />
                </IconButton>
              </span>
            </CustomTooltip>
          </section>

          <Tabs
            className={styles.Dashboard__markets__header__tabs}
            value={marketsTabIndex}
            indicatorColor="primary"
            textColor="primary"
            variant={SM_AND_BELOW_SCREEN_WIDTHS.includes(screenWidth) ? "fullWidth" : "standard"}
            centered={SM_AND_BELOW_SCREEN_WIDTHS.includes(screenWidth)}
            onChange={handleMarketsTabIndexChange}
          >
            <Tab
              icon={
                <TabCounterBadge
                  badgeContent={filterMarketData(MarketsTabIndexValues.STARRED, true).length}
                  color="secondary"
                >
                  <StarRounded />
                </TabCounterBadge>
              }
              value={MarketsTabIndexValues.STARRED}
            />
            <Tab
              label={
                <TabCounterBadge
                  badgeContent={filterMarketData(MarketsTabIndexValues.INR, true).length}
                  color="secondary"
                >
                  INR
                </TabCounterBadge>
              }
              value={MarketsTabIndexValues.INR}
            />
            <Tab
              label={
                <TabCounterBadge
                  badgeContent={filterMarketData(MarketsTabIndexValues.USDT, true).length}
                  color="secondary"
                >
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
              marketNames={filterMarketNames(MarketsTabIndexValues.STARRED)}
              category="Starred"
              showLoader={marketsData.length === 0 && loadingMarketsData}
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
              marketNames={filterMarketNames(MarketsTabIndexValues.INR)}
              category="INR"
              showLoader={marketsData.length === 0 && loadingMarketsData}
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
              marketNames={filterMarketNames(MarketsTabIndexValues.USDT)}
              category="USDT"
              showLoader={marketsData.length === 0 && loadingMarketsData}
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
