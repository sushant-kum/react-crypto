/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date May 22 2021 16:59:29 GMT+05:30
 * @modify date May 22 2021 16:59:29 GMT+05:30
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
  Typography,
} from "@material-ui/core";
import { StarRounded, StarOutlineRounded } from "@material-ui/icons";
import cryptoIcons from "base64-cryptocurrency-icons";
import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import { Img } from "react-image";

import productLogo from "../../../../assets/images/logo.svg";
import DarkModeContext from "../../../../contexts/DarkMode";
import { DarkModeContextValue } from "../../../../models/DarkMode";
import { MarketData } from "../../models/MarketData";

import styles from "./MarketsTable.module.scss";

interface ColumnDef {
  key: string;
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
  const COLUMNS: ColumnDef[] = [
    {
      key: "starred",
    },
    {
      key: "marketName",
      headerText: "Market",
    },
  ];

  const { darkModeSelection } = useContext<DarkModeContextValue>(DarkModeContext);

  const getTableCell: (cellKey: string, row: MarketData) => React.ReactNode = (cellKey, row) => {
    let tableCell: React.ReactNode;

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
              className={styles[`MarketsTable__body__row__cell--${cellKey}__icon`]}
              src={[
                `/assets/images/crypto-icons/svg/${
                  darkModeSelection ? "white" : "black"
                }/${row.name.exchangingCurrency.toLowerCase()}.svg`,
                cryptoIcons[row.name.exchangingCurrency]?.icon ?? "",
                productLogo,
              ]}
              loader={<CircularProgress size={20} thickness={2} />}
              width="20"
              height="20"
              alt={`${row.name.exchangingCurrency} icon`}
            />

            <span className={styles[`MarketsTable__body__row__cell--${cellKey}__text`]}>
              <Typography variant="body1" component="span" color="textPrimary">
                {row.name.exchangingCurrency}
              </Typography>
              <Typography variant="caption" component="span" color="textSecondary">
                &nbsp;/&nbsp;{row.name.quotationCurrency}
              </Typography>
            </span>
          </>
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
          styles[`MarketsTable__body__row__cell--${cellKey}`]
        )}
        key={cellKey}
      >
        {tableCell}
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
                styles[`MarketsTable__head__row__cell--${column.key}`]
              )}
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
              {COLUMNS.map((column: ColumnDef) => getTableCell(column.key, marketData))}
            </TableRow>
          ))
        ) : (
          <TableRow className={styles.MarketsTable__body__row}>
            <TableCell
              className={classNames(
                styles.MarketsTable__body__row__cell,
                styles["MarketsTable__body__row__cell--no-data"]
              )}
              colSpan={2}
              align="center"
            >
              <Typography variant="subtitle1" color="textPrimary">
                No {category} markets found
              </Typography>
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
        exchangingCurrency: PropTypes.string.isRequired,
        quotationCurrency: PropTypes.string.isRequired,
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
