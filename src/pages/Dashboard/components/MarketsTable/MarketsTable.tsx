/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date May 22 2021 16:59:29 GMT+05:30
 * @modify date Aug 11 2021 21:08:59 GMT+05:30
 * @desc MarketsTable component
 */

import {
  CircularProgress,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";
import {
  StarRounded,
  StarOutlineRounded,
  KeyboardArrowUpRounded,
  KeyboardArrowDownRounded,
  InfoRounded,
  AddRounded,
  RemoveRounded,
} from "@material-ui/icons";
import classNames from "classnames";
import PropTypes from "prop-types";
import React, { Dispatch } from "react";
import { Img } from "react-image";
import { useDispatch, useSelector } from "react-redux";

import productLogo from "../../../../assets/images/logo.svg";
import CustomTooltip from "../../../../components/CustomTooltip/CustomTooltip";
import useScreenWidth from "../../../../hooks/useScreenWidth";
import { StoreDispatch } from "../../../../store";
import {
  getMarketsDataLoadingSelector,
  getMultipleMarketsDataSelector,
  setMarketStarValue,
} from "../../../../store/data/marketsData";
import { ThemeType, getThemeTypeSelector } from "../../../../store/settings/themeType";
import { MarketData } from "../../models/MarketData";

import styles from "./MarketsTable.module.scss";

interface ColumnDef {
  key: string;
  align: "left" | "center" | "right";
  headerText?: React.ReactNode;
}

interface MarketsTableProps extends React.HTMLAttributes<HTMLElement> {
  marketNames: string[];
  category: "Starred" | "INR" | "USDT";
  showLoader?: boolean;
}

const MarketsTable: React.FC<MarketsTableProps> = ({ marketNames, category, showLoader, ...props }) => {
  const SM_AND_BELOW_SCREEN_WIDTHS: Breakpoint[] = ["xs", "sm"];
  const MD_AND_BELOW_SCREEN_WIDTHS: Breakpoint[] = ["xs", "sm", "md"];
  const MD_AND_BELOW_COLS: ColumnDef[] = [
    {
      key: "starred",
      align: "center",
    },
    {
      key: "marketName",
      align: "left",
      headerText: "Market",
    },
    {
      key: "lastPrice",
      align: "center",
      headerText: (
        <>
          Last Price&nbsp;
          <CustomTooltip
            title={
              <Typography variant="body2" component="span">
                Last price traded from the orderbook.
              </Typography>
            }
            arrow
          >
            <InfoRounded
              className={styles["MarketsTable__head__row__cell__tooltip-icon"]}
              fontSize="small"
              color="secondary"
            />
          </CustomTooltip>
        </>
      ),
    },
    {
      key: "twentyFourHrData",
      align: "center",
      headerText: (
        <>
          24 hr Data&nbsp;
          <CustomTooltip
            title={
              <>
                <Typography color="primary">Legends</Typography>

                <div className={styles[`MarketsTable__head__row__cell--twentyFourHrData__tooltip__legend-details`]}>
                  <Typography
                    className={
                      styles[`MarketsTable__head__row__cell--twentyFourHrData__tooltip__legend-details__legend`]
                    }
                    variant="body1"
                    component="span"
                    color="secondary"
                  >
                    C
                  </Typography>
                  <Typography
                    className={
                      styles[`MarketsTable__head__row__cell--twentyFourHrData__tooltip__legend-details__details`]
                    }
                    variant="body2"
                    component="span"
                  >
                    24 hr Change
                  </Typography>
                </div>

                <div className={styles[`MarketsTable__head__row__cell--twentyFourHrData__tooltip__legend-details`]}>
                  <Typography
                    className={
                      styles[`MarketsTable__head__row__cell--twentyFourHrData__tooltip__legend-details__legend`]
                    }
                    variant="body1"
                    component="span"
                    color="secondary"
                  >
                    H
                  </Typography>
                  <Typography
                    className={
                      styles[`MarketsTable__head__row__cell--twentyFourHrData__tooltip__legend-details__details`]
                    }
                    variant="body2"
                    component="span"
                  >
                    24 hr High
                  </Typography>
                </div>

                <div className={styles[`MarketsTable__head__row__cell--twentyFourHrData__tooltip__legend-details`]}>
                  <Typography
                    className={
                      styles[`MarketsTable__head__row__cell--twentyFourHrData__tooltip__legend-details__legend`]
                    }
                    variant="body1"
                    component="span"
                    color="secondary"
                  >
                    L
                  </Typography>
                  <Typography
                    className={
                      styles[`MarketsTable__head__row__cell--twentyFourHrData__tooltip__legend-details__details`]
                    }
                    variant="body2"
                    component="span"
                  >
                    24 hr Low
                  </Typography>
                </div>

                <div className={styles[`MarketsTable__head__row__cell--twentyFourHrData__tooltip__legend-details`]}>
                  <Typography
                    className={
                      styles[`MarketsTable__head__row__cell--twentyFourHrData__tooltip__legend-details__legend`]
                    }
                    variant="body1"
                    component="span"
                    color="secondary"
                  >
                    V
                  </Typography>
                  <Typography
                    className={
                      styles[`MarketsTable__head__row__cell--twentyFourHrData__tooltip__legend-details__details`]
                    }
                    variant="body2"
                    component="span"
                  >
                    24 hr Volume (Traded volume of the base currency in that market.)
                  </Typography>
                </div>
              </>
            }
            arrow
          >
            <InfoRounded
              className={styles["MarketsTable__head__row__cell__tooltip-icon"]}
              fontSize="small"
              color="secondary"
            />
          </CustomTooltip>
        </>
      ),
    },
  ];
  const LG_AND_ABOVE_COLS: ColumnDef[] = [
    {
      key: "starred",
      align: "center",
    },
    {
      key: "marketName",
      align: "left",
      headerText: "Market",
    },
    {
      key: "lastPrice",
      align: "center",
      headerText: (
        <>
          Last Price&nbsp;
          <CustomTooltip
            title={
              <Typography variant="body2" component="span">
                Last price traded from the orderbook.
              </Typography>
            }
            arrow
          >
            <InfoRounded
              className={styles["MarketsTable__head__row__cell__tooltip-icon"]}
              fontSize="small"
              color="secondary"
            />
          </CustomTooltip>
        </>
      ),
    },
    {
      key: "twentyFourHrChange",
      align: "center",
      headerText: "24 hr Change",
    },
    {
      key: "twentyFourHrHigh",
      align: "center",
      headerText: "24 hr High",
    },
    {
      key: "twentyFourHrLow",
      align: "center",
      headerText: "24 hr Low",
    },
    {
      key: "twentyFourHrVol",
      align: "center",
      headerText: (
        <>
          24 hr Volume&nbsp;
          <CustomTooltip
            title={
              <Typography variant="body2" component="span">
                Traded volume of the base currency in that market.
              </Typography>
            }
            arrow
          >
            <InfoRounded
              className={styles["MarketsTable__head__row__cell__tooltip-icon"]}
              fontSize="small"
              color="secondary"
            />
          </CustomTooltip>
        </>
      ),
    },
  ];

  const screenWidth: Breakpoint = useScreenWidth();
  const dispatch: Dispatch<StoreDispatch> = useDispatch<Dispatch<StoreDispatch>>();
  const themeType: ThemeType = useSelector(getThemeTypeSelector);
  const loadingMarketsData: boolean | undefined = useSelector(getMarketsDataLoadingSelector);
  const marketsData: MarketData[] = useSelector(getMultipleMarketsDataSelector(marketNames));

  const addUnit: (content: React.ReactNode, quotationCurrency: string) => React.ReactNode = (
    content,
    quotationCurrency
  ) => {
    return (
      <>
        {content}&nbsp;
        {quotationCurrency === "USDT" && (
          <Typography variant="caption" component="span" color="textSecondary">
            USDT
          </Typography>
        )}
        {quotationCurrency === "INR" && (
          <Typography variant="caption" component="span" color="textSecondary">
            INR
          </Typography>
        )}
      </>
    );
  };

  const getTableCell: (column: ColumnDef, row: MarketData) => React.ReactNode = (column, row) => {
    const cellKey = column.key;

    let tableCell: React.ReactNode;
    let twentyFourChangeValIcon: React.ReactNode;
    let twentyFourChangePercIcon: React.ReactNode;

    if (row.twentyFourHr.priceChangePercentage > 0) {
      twentyFourChangeValIcon = (
        <AddRounded
          className={styles[`MarketsTable__body__row__cell--twentyFourHrChange__content__change__value__icon`]}
          fontSize="inherit"
        />
      );

      twentyFourChangePercIcon = (
        <KeyboardArrowUpRounded
          className={styles[`MarketsTable__body__row__cell--twentyFourHrChange__content__change__percentage__icon`]}
        />
      );
    } else if (row.twentyFourHr.priceChangePercentage < 0) {
      twentyFourChangeValIcon = (
        <RemoveRounded
          className={styles[`MarketsTable__body__row__cell--twentyFourHrChange__content__change__value__icon`]}
          fontSize="inherit"
        />
      );

      twentyFourChangePercIcon = (
        <KeyboardArrowDownRounded
          className={styles[`MarketsTable__body__row__cell--twentyFourHrChange__content__change__percentage__icon`]}
        />
      );
    }

    switch (cellKey) {
      // common columns

      case "starred":
        tableCell = (
          <IconButton
            size="small"
            color={row.starred ? "primary" : "default"}
            disabled={loadingMarketsData}
            onClick={() => dispatch(setMarketStarValue(row.name.market, !row.starred))}
          >
            {row.starred ? <StarRounded /> : <StarOutlineRounded />}
          </IconButton>
        );
        break;

      case "marketName":
        tableCell = (
          <>
            <Img
              className={styles[`MarketsTable__body__row__cell--${cellKey}__content__icon`]}
              src={[
                (themeType === "dark" ? row.icons.selfHosted.white : row.icons.selfHosted.black) ?? "",
                row.icons.buyUCoin ?? "",
                productLogo,
              ]}
              loader={<CircularProgress size={20} thickness={2} />}
              width="20"
              height="20"
              alt={`${row.name.exchangingCurrency} icon`}
            />

            <span className={styles[`MarketsTable__body__row__cell--${cellKey}__content__text`]}>
              <Typography variant="body1" component="span">
                {row.name.exchangingCurrency}
              </Typography>
              {SM_AND_BELOW_SCREEN_WIDTHS.includes(screenWidth) ? <br /> : null}
              <Typography variant="caption" component="span" color="textSecondary">
                &nbsp;/&nbsp;{row.name.quotationCurrency}
              </Typography>
            </span>
          </>
        );
        break;

      case "lastPrice":
        tableCell = (
          <Typography variant="body1" component="span">
            {SM_AND_BELOW_SCREEN_WIDTHS.includes(screenWidth)
              ? row.lastTrade.price
              : addUnit(row.lastTrade.price, row.name.quotationCurrency)}
          </Typography>
        );
        break;

      // md-and-below columns

      case "twentyFourHrData":
        tableCell = (
          <>
            <div className={styles[`MarketsTable__body__row__cell--${cellKey}__content__change`]}>
              <Typography
                className={styles[`MarketsTable__body__row__cell--${cellKey}__content__change__legend`]}
                variant="body1"
                component="span"
                color="secondary"
              >
                C
              </Typography>

              <div
                className={classNames(
                  styles[`MarketsTable__body__row__cell--${cellKey}__content__change__percentage`],
                  row.twentyFourHr.priceChangePercentage !== 0 &&
                    (row.twentyFourHr.priceChangePercentage > 0
                      ? styles[`MarketsTable__body__row__cell--${cellKey}__content__change__percentage--up`]
                      : styles[`MarketsTable__body__row__cell--${cellKey}__content__change__percentage--down`]),
                  themeType === "dark"
                    ? styles[`MarketsTable__body__row__cell--${cellKey}__content__change__percentage--theme-dark`]
                    : styles[`MarketsTable__body__row__cell--${cellKey}__content__change__percentage--theme-light`]
                )}
              >
                {twentyFourChangePercIcon}

                <Typography
                  className={classNames(
                    styles[`MarketsTable__body__row__cell--${cellKey}__content__change__percentage__text`],
                    !twentyFourChangePercIcon
                      ? styles[`MarketsTable__body__row__cell--${cellKey}__content__change__percentage__text--zero`]
                      : null
                  )}
                  variant="body1"
                  component="span"
                >
                  {row.twentyFourHr.priceChangePercentage} %
                </Typography>
              </div>

              {screenWidth !== "xs" && (
                <>
                  <div className={styles[`MarketsTable__body__row__cell--${cellKey}__content__change__value`]}>
                    {twentyFourChangeValIcon}

                    <Typography
                      className={styles[`MarketsTable__body__row__cell--${cellKey}__content__change__value__text`]}
                      variant="body1"
                      component="span"
                    >
                      {addUnit(Math.abs(row.twentyFourHr.priceChange), row.name.quotationCurrency)}
                    </Typography>
                  </div>
                </>
              )}
            </div>

            <Divider
              className={classNames(
                styles[`MarketsTable__body__row__cell--${cellKey}__content__divider`],
                styles[`MarketsTable__body__row__cell--${cellKey}__content__divider--change-high`]
              )}
            />

            <div className={styles[`MarketsTable__body__row__cell--${cellKey}__content__high`]}>
              <Typography
                className={styles[`MarketsTable__body__row__cell--${cellKey}__content__high__legend`]}
                variant="body1"
                component="span"
                color="secondary"
              >
                H
              </Typography>

              <Typography
                className={styles[`MarketsTable__body__row__cell--${cellKey}__content__high__value`]}
                variant="body1"
                component="span"
              >
                {screenWidth === "xs"
                  ? row.twentyFourHr.highestPrice
                  : addUnit(row.twentyFourHr.highestPrice, row.name.quotationCurrency)}
              </Typography>
            </div>

            <Divider
              className={classNames(
                styles[`MarketsTable__body__row__cell--${cellKey}__content__divider`],
                styles[`MarketsTable__body__row__cell--${cellKey}__content__divider--high-low`]
              )}
              orientation={screenWidth === "xs" ? "horizontal" : "vertical"}
            />

            <div className={styles[`MarketsTable__body__row__cell--${cellKey}__content__low`]}>
              <Typography
                className={styles[`MarketsTable__body__row__cell--${cellKey}__content__low__legend`]}
                variant="body1"
                component="span"
                color="secondary"
              >
                L
              </Typography>

              <Typography
                className={styles[`MarketsTable__body__row__cell--${cellKey}__content__low__value`]}
                variant="body1"
                component="span"
              >
                {screenWidth === "xs"
                  ? row.twentyFourHr.lowestPrice
                  : addUnit(row.twentyFourHr.lowestPrice, row.name.quotationCurrency)}
              </Typography>
            </div>

            <Divider
              className={classNames(
                styles[`MarketsTable__body__row__cell--${cellKey}__content__divider`],
                styles[`MarketsTable__body__row__cell--${cellKey}__content__divider--low-vol`]
              )}
            />

            <div className={styles[`MarketsTable__body__row__cell--${cellKey}__content__vol`]}>
              <Typography
                className={styles[`MarketsTable__body__row__cell--${cellKey}__content__vol__legend`]}
                variant="body1"
                component="span"
                color="secondary"
              >
                V
              </Typography>

              <Typography
                className={styles[`MarketsTable__body__row__cell--${cellKey}__content__vol__value`]}
                variant="body1"
                component="span"
              >
                {screenWidth === "xs"
                  ? parseFloat(row.twentyFourHr.tradedVolumeQuotationCurrency.toFixed(2))
                  : addUnit(
                      parseFloat(row.twentyFourHr.tradedVolumeQuotationCurrency.toFixed(2)),
                      row.name.quotationCurrency
                    )}
              </Typography>
            </div>
          </>
        );
        break;

      // lg-and-above columns

      case "twentyFourHrChange":
        tableCell = (
          <>
            {!SM_AND_BELOW_SCREEN_WIDTHS.includes(screenWidth) && (
              <>
                <div className={styles[`MarketsTable__body__row__cell--${cellKey}__content__value`]}>
                  {twentyFourChangeValIcon}

                  <Typography
                    className={styles[`MarketsTable__body__row__cell--${cellKey}__content__value__text`]}
                    variant="body1"
                    component="span"
                  >
                    {addUnit(Math.abs(row.twentyFourHr.priceChange), row.name.quotationCurrency)}
                  </Typography>
                </div>

                <div className={styles[`MarketsTable__body__row__cell--${cellKey}__content__divider`]}>
                  <Divider orientation="vertical" />
                </div>
              </>
            )}

            <div className={styles[`MarketsTable__body__row__cell--${cellKey}__content__percentage`]}>
              {twentyFourChangePercIcon}

              <Typography
                className={classNames(
                  styles[`MarketsTable__body__row__cell--${cellKey}__content__percentage__text`],
                  !twentyFourChangePercIcon
                    ? styles[`MarketsTable__body__row__cell--${cellKey}__content__percentage__text--zero`]
                    : null
                )}
                variant="body1"
                component="span"
              >
                {row.twentyFourHr.priceChangePercentage} %
              </Typography>
            </div>
          </>
        );
        break;

      case "twentyFourHrHigh":
        tableCell = (
          <Typography
            className={styles[`MarketsTable__body__row__cell--${cellKey}__content__text`]}
            variant="body1"
            component="span"
          >
            {SM_AND_BELOW_SCREEN_WIDTHS.includes(screenWidth)
              ? row.twentyFourHr.highestPrice
              : addUnit(row.twentyFourHr.highestPrice, row.name.quotationCurrency)}
          </Typography>
        );
        break;

      case "twentyFourHrLow":
        tableCell = (
          <Typography
            className={styles[`MarketsTable__body__row__cell--${cellKey}__content__text`]}
            variant="body1"
            component="span"
          >
            {SM_AND_BELOW_SCREEN_WIDTHS.includes(screenWidth)
              ? row.twentyFourHr.lowestPrice
              : addUnit(row.twentyFourHr.lowestPrice, row.name.quotationCurrency)}
          </Typography>
        );
        break;

      case "twentyFourHrVol":
        tableCell = (
          <Typography
            className={styles[`MarketsTable__body__row__cell--${cellKey}__content__text`]}
            variant="body1"
            component="span"
          >
            {SM_AND_BELOW_SCREEN_WIDTHS.includes(screenWidth)
              ? parseFloat(row.twentyFourHr.tradedVolumeQuotationCurrency.toFixed(2))
              : addUnit(
                  parseFloat(row.twentyFourHr.tradedVolumeQuotationCurrency.toFixed(2)),
                  row.name.quotationCurrency
                )}
          </Typography>
        );
        break;

      default:
        tableCell = cellKey;
        break;
    }

    return (
      <TableCell
        className={classNames(
          styles.MarketsTable__body__row__cell,
          styles[`MarketsTable__body__row__cell--${cellKey}`],
          cellKey === "twentyFourHrChange" &&
            row.twentyFourHr.priceChangePercentage !== 0 &&
            (row.twentyFourHr.priceChangePercentage > 0
              ? styles[`MarketsTable__body__row__cell--${cellKey}--up`]
              : styles[`MarketsTable__body__row__cell--${cellKey}--down`])
        )}
        align={column.align}
        key={cellKey}
      >
        <div className={styles[`MarketsTable__body__row__cell--${cellKey}__content`]}>{tableCell}</div>
      </TableCell>
    );
  };

  return (
    <Table
      className={classNames(styles.MarketsTable, props.className)}
      size="small"
      aria-label="market table"
      data-testid="MarketsTable"
    >
      <TableHead className={styles.MarketsTable__head}>
        <TableRow className={styles.MarketsTable__head__row}>
          {MD_AND_BELOW_SCREEN_WIDTHS.includes(screenWidth)
            ? React.Children.toArray(
                MD_AND_BELOW_COLS.map((column: ColumnDef) => (
                  <TableCell
                    className={classNames(
                      styles.MarketsTable__head__row__cell,
                      themeType === "dark"
                        ? styles[`MarketsTable__head__row__cell--theme-dark`]
                        : styles[`MarketsTable__head__row__cell--theme-light`],
                      styles[`MarketsTable__head__row__cell--${column.key}`]
                    )}
                    align={column.align}
                  >
                    {column.headerText}
                  </TableCell>
                ))
              )
            : React.Children.toArray(
                LG_AND_ABOVE_COLS.map((column: ColumnDef) => (
                  <TableCell
                    className={classNames(
                      styles.MarketsTable__head__row__cell,
                      themeType === "dark"
                        ? styles[`MarketsTable__head__row__cell--theme-dark`]
                        : styles[`MarketsTable__head__row__cell--theme-light`],
                      styles[`MarketsTable__head__row__cell--${column.key}`]
                    )}
                    align={column.align}
                  >
                    {column.headerText}
                  </TableCell>
                ))
              )}
        </TableRow>
      </TableHead>

      <TableBody className={styles.MarketsTable__body}>
        {marketsData.length > 0 ? (
          React.Children.toArray(
            marketsData.map((marketData: MarketData) => (
              <TableRow className={styles.MarketsTable__body__row}>
                {MD_AND_BELOW_SCREEN_WIDTHS.includes(screenWidth)
                  ? MD_AND_BELOW_COLS.map((column: ColumnDef) => getTableCell(column, marketData))
                  : LG_AND_ABOVE_COLS.map((column: ColumnDef) => getTableCell(column, marketData))}
              </TableRow>
            ))
          )
        ) : (
          <TableRow className={styles.MarketsTable__body__row}>
            <TableCell
              className={classNames(
                styles.MarketsTable__body__row__cell,
                showLoader
                  ? styles["MarketsTable__body__row__cell--loading-data"]
                  : styles["MarketsTable__body__row__cell--no-data"]
              )}
              colSpan={
                MD_AND_BELOW_SCREEN_WIDTHS.includes(screenWidth) ? MD_AND_BELOW_COLS.length : LG_AND_ABOVE_COLS.length
              }
              align="center"
            >
              {showLoader ? (
                <CircularProgress size={47} thickness={3} />
              ) : (
                <>
                  <Typography variant="subtitle1">No {category} markets found</Typography>
                  {category === "Starred" && (
                    <Typography variant="body1" color="textSecondary">
                      You can star a market by clicking on the{" "}
                      <StarOutlineRounded
                        className={styles["MarketsTable__body__row__cell--no-data__body__star-icon"]}
                        fontSize="small"
                      />{" "}
                      icon.
                    </Typography>
                  )}
                </>
              )}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

MarketsTable.propTypes = {
  marketNames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  category: PropTypes.oneOf<"Starred" | "INR" | "USDT">(["Starred", "INR", "USDT"]).isRequired,
  showLoader: PropTypes.bool,
  className: PropTypes.string,
};

MarketsTable.defaultProps = {
  showLoader: false,
  className: undefined,
};

export default MarketsTable;
