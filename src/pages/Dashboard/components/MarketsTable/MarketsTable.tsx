/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date May 22 2021 16:59:29 GMT+05:30
 * @modify date May 30 2021 21:21:35 GMT+05:30
 * @desc MarketsTable component
 */

import {
  CircularProgress,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";
import {
  StarRounded,
  StarOutlineRounded,
  KeyboardArrowUpRounded,
  KeyboardArrowDownRounded,
  InfoRounded,
} from "@material-ui/icons";
import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import { Img } from "react-image";

import productLogo from "../../../../assets/images/logo.svg";
import DarkModeContext from "../../../../contexts/DarkMode";
import useScreenWidth from "../../../../hooks/useScreenWidth";
import { DarkModeContextValue } from "../../../../models/DarkMode";
import { MarketData } from "../../models/MarketData";

import styles from "./MarketsTable.module.scss";

interface ColumnDef {
  key: string;
  align: "left" | "center" | "right";
  headerText?: React.ReactNode;
}

interface MarketsTableProps extends React.HTMLAttributes<HTMLElement> {
  marketsData: MarketData[];
  category: "Starred" | "INR" | "USDT";
  loadingMarketsData: boolean;
  setMarketStar: (market: string, starred: boolean) => void;
}

const MarketsTable: React.FC<MarketsTableProps> = ({
  marketsData,
  category,
  loadingMarketsData,
  setMarketStar,
  ...props
}) => {
  const SMALL_SCREEN_WIDTHS: Breakpoint[] = ["xs", "sm"];
  const COLUMNS: ColumnDef[] = [
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
          <Tooltip title="Last price traded from the orderbook." arrow>
            <InfoRounded
              className={styles["MarketsTable__head__row__cell__tooltip-icon"]}
              fontSize="small"
              color="secondary"
            />
          </Tooltip>
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
          <Tooltip title="Traded volume of the base currency in that market." arrow>
            <InfoRounded
              className={styles["MarketsTable__head__row__cell__tooltip-icon"]}
              fontSize="small"
              color="secondary"
            />
          </Tooltip>
        </>
      ),
    },
  ];

  const screenWidth: Breakpoint = useScreenWidth();
  const { darkModeSelection } = useContext<DarkModeContextValue>(DarkModeContext);

  const addUnit: (content: React.ReactNode, quotationCurrency: string) => React.ReactNode = (
    content,
    quotationCurrency
  ) => {
    return (
      <>
        {quotationCurrency === "INR" && (
          <Typography variant="caption" component="span" color="textSecondary">
            &#8377;
          </Typography>
        )}
        &nbsp;
        {content}&nbsp;
        {quotationCurrency === "USDT" && (
          <Typography variant="caption" component="span" color="textSecondary">
            USDT
          </Typography>
        )}
      </>
    );
  };

  const getTableCell: (column: ColumnDef, row: MarketData) => React.ReactNode = (column, row) => {
    const cellKey = column.key;
    let tableCell: React.ReactNode;
    let twentyFourChangeIcon: React.ReactNode;

    if (row.twentyFourHr.priceChangePercentage > 0) {
      twentyFourChangeIcon = (
        <KeyboardArrowUpRounded
          className={styles[`MarketsTable__body__row__cell--twentyFourHrChange__content__icon`]}
        />
      );
    } else if (row.twentyFourHr.priceChangePercentage < 0) {
      twentyFourChangeIcon = (
        <KeyboardArrowDownRounded
          className={styles[`MarketsTable__body__row__cell--twentyFourHrChange__content__icon`]}
        />
      );
    }

    switch (cellKey) {
      case "starred":
        tableCell = (
          <IconButton
            size="small"
            color={row.starred ? "primary" : "default"}
            disabled={loadingMarketsData}
            onClick={() => setMarketStar(row.name.market, !row.starred)}
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
                (darkModeSelection ? row.icons.selfHosted.white : row.icons.selfHosted.black) ?? "",
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
              {SMALL_SCREEN_WIDTHS.includes(screenWidth) ? <br /> : null}
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
            {SMALL_SCREEN_WIDTHS.includes(screenWidth)
              ? row.lastTrade.price
              : addUnit(row.lastTrade.price, row.name.quotationCurrency)}
          </Typography>
        );
        break;

      case "twentyFourHrChange":
        tableCell = (
          <>
            {twentyFourChangeIcon}

            <Typography
              className={styles[`MarketsTable__body__row__cell--${cellKey}__content__text`]}
              variant="body1"
              component="span"
            >
              {row.twentyFourHr.priceChangePercentage} %
            </Typography>
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
            {SMALL_SCREEN_WIDTHS.includes(screenWidth)
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
            {SMALL_SCREEN_WIDTHS.includes(screenWidth)
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
            {SMALL_SCREEN_WIDTHS.includes(screenWidth)
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
              ? styles[`MarketsTable__body__row__cell--${cellKey}--green`]
              : styles[`MarketsTable__body__row__cell--${cellKey}--red`])
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
          {COLUMNS.map((column: ColumnDef) => (
            <TableCell
              className={classNames(
                styles.MarketsTable__head__row__cell,
                darkModeSelection
                  ? styles[`MarketsTable__head__row__cell--dark`]
                  : styles[`MarketsTable__head__row__cell--light`],
                styles[`MarketsTable__head__row__cell--${column.key}`]
              )}
              align={column.align}
              key={column.key}
            >
              {column.headerText}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>

      <TableBody className={styles.MarketsTable__body}>
        {marketsData.length > 0 ? (
          marketsData.map((marketData: MarketData) => (
            <TableRow className={styles.MarketsTable__body__row} key={marketData.name.market}>
              {COLUMNS.map((column: ColumnDef) => getTableCell(column, marketData))}
            </TableRow>
          ))
        ) : (
          <TableRow className={styles.MarketsTable__body__row}>
            <TableCell
              className={classNames(
                styles.MarketsTable__body__row__cell,
                styles["MarketsTable__body__row__cell--no-data"]
              )}
              colSpan={COLUMNS.length}
              align="center"
            >
              <Typography variant="subtitle1">No {category} markets found</Typography>
              {category === "Starred" && (
                <Typography variant="body1" color="textSecondary">
                  You can star a market by clicking on the <StarOutlineRounded fontSize="small" /> icon.
                </Typography>
              )}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

MarketsTable.propTypes = {
  marketsData: PropTypes.arrayOf(
    PropTypes.exact({
      name: PropTypes.exact({
        market: PropTypes.string.isRequired,
        currency: PropTypes.string.isRequired,
        exchangingCurrency: PropTypes.string.isRequired,
        quotationCurrency: PropTypes.string.isRequired,
      }).isRequired,
      icons: PropTypes.exact({
        selfHosted: PropTypes.exact({
          black: PropTypes.string,
          white: PropTypes.string,
        }).isRequired,
        buyUCoin: PropTypes.string,
      }).isRequired,
      bestBid: PropTypes.number.isRequired,
      bestAsk: PropTypes.number.isRequired,
      bidAskDiffPerc: PropTypes.number.isRequired,
      totalLimitOrderVolume: PropTypes.exact({
        bid: PropTypes.number.isRequired,
        ask: PropTypes.number.isRequired,
      }).isRequired,
      twentyFourHr: PropTypes.exact({
        highestPrice: PropTypes.number.isRequired,
        lowestPrice: PropTypes.number.isRequired,
        tradedVolume: PropTypes.number.isRequired,
        tradedVolumeQuotationCurrency: PropTypes.number.isRequired,
        priceChange: PropTypes.number.isRequired,
        priceChangePercentage: PropTypes.number.isRequired,
      }).isRequired,
      lastTrade: PropTypes.exact({
        price: PropTypes.number.isRequired,
        volume: PropTypes.number.isRequired,
      }).isRequired,
      lastBuy: PropTypes.exact({
        price: PropTypes.number.isRequired,
        volume: PropTypes.number.isRequired,
      }).isRequired,
      lastSell: PropTypes.exact({
        price: PropTypes.number.isRequired,
        volume: PropTypes.number.isRequired,
      }).isRequired,
      starred: PropTypes.bool.isRequired,
    }).isRequired
  ).isRequired,
  category: PropTypes.oneOf<"Starred" | "INR" | "USDT">(["Starred", "INR", "USDT"]).isRequired,
  loadingMarketsData: PropTypes.bool.isRequired,
  setMarketStar: PropTypes.func.isRequired,
  className: PropTypes.string,
};

MarketsTable.defaultProps = {
  className: undefined,
};

export default MarketsTable;
