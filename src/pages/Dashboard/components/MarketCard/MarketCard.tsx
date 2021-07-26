/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date Jun 06 2021 14:24:07 GMT+05:30
 * @modify date Jul 26 2021 10:38:18 GMT+05:30
 * @desc MarketCard
 */

import { Avatar, Card, CardContent, CardHeader, IconButton, Typography } from "@material-ui/core";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";
import { StarRounded, StarOutlineRounded, KeyboardArrowUpRounded, KeyboardArrowDownRounded } from "@material-ui/icons";
import axios, { AxiosResponse } from "axios";
import classNames from "classnames";
import * as dateFns from "date-fns";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useImage } from "react-image";
import { useSelector } from "react-redux";
import { Sparklines, SparklinesLine } from "react-sparklines";

import productLogo from "../../../../assets/images/logo.svg";
import coinGeckoApiEndpoint, { CoinGeckoApiQueryParams } from "../../../../constants/CoingeckoApi";
import useScreenWidth from "../../../../hooks/useScreenWidth";
import { getThemeType, ThemeType } from "../../../../store/settings/themeType";
import palette from "../../../../styles/constants/palette/palette.module.scss";
import { MarketData } from "../../models/MarketData";

import styles from "./MarketCard.module.scss";
import {
  ChartDataPoint,
  CoinGeckoMarketChartDataApiResponse,
  MarketChartData,
  parseMarketChartData,
} from "./models/MarketChartData";

interface MarketCardProps extends React.HTMLAttributes<HTMLElement> {
  marketData: MarketData;
  loadingMarketsData: boolean;
  setMarketStar: (market: string, starred: boolean) => void;
}

const MarketCard: React.FC<MarketCardProps> = ({ marketData, loadingMarketsData, setMarketStar, ...props }) => {
  const SM_AND_BELOW_SCREEN_WIDTHS: Breakpoint[] = ["xs", "sm"];

  let twentyFourChangePercIcon: React.ReactNode;
  const screenWidth: Breakpoint = useScreenWidth();
  const themeType: ThemeType = useSelector(getThemeType);
  const { src: coinIconSrc } = useImage({
    srcList: [
      (themeType === "dark" ? marketData.icons.selfHosted.white : marketData.icons.selfHosted.black) ?? "",
      marketData.icons.buyUCoin ?? "",
      productLogo,
    ],
  });
  const [marketPriceChartData, marketPriceChartDataSet]: [
    MarketChartData | undefined,
    React.Dispatch<React.SetStateAction<MarketChartData | undefined>>
  ] = useState<MarketChartData>();
  const [priceChartDataPoints, priceChartDataPointsSet]: [number[], React.Dispatch<React.SetStateAction<number[]>>] =
    useState<number[]>([]);

  if (marketData.twentyFourHr.priceChangePercentage > 0) {
    twentyFourChangePercIcon = (
      <KeyboardArrowUpRounded className={styles[`MarketCard__header__content__subheader__change-perc__icon`]} />
    );
  } else if (marketData.twentyFourHr.priceChangePercentage < 0) {
    twentyFourChangePercIcon = (
      <KeyboardArrowDownRounded className={styles[`MarketCard__header__content__subheader__change-perc__icon`]} />
    );
  }

  const setMarketPriceChartDataAndPriceChartDataPoints: (marketChartData: MarketChartData) => void = (
    marketChartData
  ) => {
    marketPriceChartDataSet(marketChartData);
    priceChartDataPointsSet(marketChartData.chartData.map((chartDataPoint: ChartDataPoint) => chartDataPoint.value));
  };

  const getMarketPriceChartData: (
    coin: string,
    market: string,
    quotationCurrency: string,
    from: Date,
    to: Date
  ) => void = (coin, market, quotationCurrency, from, to) => {
    // eslint-disable-next-line no-param-reassign
    quotationCurrency = quotationCurrency.toLowerCase();
    const params: CoinGeckoApiQueryParams["marketChartData"] = {
      vs_currency: "inr",
      from: dateFns.getUnixTime(from),
      to: dateFns.getUnixTime(to),
    };

    axios
      .get<CoinGeckoMarketChartDataApiResponse>(coinGeckoApiEndpoint.marketChartData(coin), { params })
      .then((res: AxiosResponse<CoinGeckoMarketChartDataApiResponse>) => res.data)
      .then((marketsChartDataResponse: CoinGeckoMarketChartDataApiResponse) =>
        parseMarketChartData(market, marketsChartDataResponse, "prices")
      )
      .then((marketChartData: MarketChartData) => {
        if (quotationCurrency === "inr") {
          setMarketPriceChartDataAndPriceChartDataPoints(marketChartData);
        } else {
          axios
            .get<CoinGeckoMarketChartDataApiResponse>(coinGeckoApiEndpoint.marketChartData("tether"), { params })
            .then((res: AxiosResponse<CoinGeckoMarketChartDataApiResponse>) => res.data)
            .then((marketsChartDataResponse: CoinGeckoMarketChartDataApiResponse) =>
              parseMarketChartData(market, marketsChartDataResponse, "prices")
            )
            .then((tetherMarketChartData: MarketChartData) => {
              const tetherInrChartDataPoints: ChartDataPoint[] = tetherMarketChartData.chartData;
              const marketInrChartDataPoints: ChartDataPoint[] = marketChartData.chartData;
              const marketUsdtChartDataPoints: ChartDataPoint[] = [];

              marketInrChartDataPoints.forEach((marketInrChartDataPoint: ChartDataPoint) => {
                let tetherInrPrice: number;

                if (marketInrChartDataPoint.unixTimeStamp < tetherInrChartDataPoints[0].unixTimeStamp) {
                  tetherInrPrice = tetherInrChartDataPoints[0].value;
                } else if (
                  marketInrChartDataPoint.unixTimeStamp >
                  tetherInrChartDataPoints[tetherInrChartDataPoints.length - 1].unixTimeStamp
                ) {
                  tetherInrPrice = tetherInrChartDataPoints[tetherInrChartDataPoints.length - 1].value;
                } else {
                  tetherInrPrice = tetherInrChartDataPoints.filter(
                    (tetherInrChartDataPoint: ChartDataPoint, index: number) =>
                      index < tetherInrChartDataPoints.length - 1
                        ? marketInrChartDataPoint.unixTimeStamp >= tetherInrChartDataPoint.unixTimeStamp &&
                          marketInrChartDataPoint.unixTimeStamp < tetherInrChartDataPoints[index + 1].unixTimeStamp
                        : true
                  )[0].value;
                }

                marketUsdtChartDataPoints.push({
                  unixTimeStamp: marketInrChartDataPoint.unixTimeStamp,
                  value: marketInrChartDataPoint.value / tetherInrPrice,
                });
              });

              setMarketPriceChartDataAndPriceChartDataPoints({
                market,
                chartData: marketUsdtChartDataPoints,
              });
            });
        }
      });
  };

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

  useEffect(() => {
    const currentTime: Date = new Date();

    getMarketPriceChartData(
      marketData.coinGeckoId,
      marketData.name.market,
      marketData.name.quotationCurrency,
      dateFns.sub(currentTime, { hours: 24 }),
      currentTime
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marketData]);

  return (
    <Card className={classNames(styles.MarketCard, props.className)} elevation={0} data-testid="MarketCard">
      <CardHeader
        className={styles.MarketCard__header}
        classes={{
          content: styles.MarketCard__header__content,
          subheader: styles.MarketCard__header__content__subheader,
        }}
        avatar={<Avatar aria-label="Coin Icon" src={coinIconSrc} />}
        title={
          <>
            <Typography variant="body1" component="span">
              {marketData.name.exchangingCurrency}
            </Typography>
            <Typography variant="caption" component="span" color="textSecondary">
              &nbsp;/&nbsp;{marketData.name.quotationCurrency}
            </Typography>
          </>
        }
        subheader={
          <>
            <Typography
              className={styles.MarketCard__header__content__subheader__price}
              variant="body1"
              component="span"
            >
              {SM_AND_BELOW_SCREEN_WIDTHS.includes(screenWidth)
                ? marketData.lastTrade.price
                : addUnit(marketData.lastTrade.price, marketData.name.quotationCurrency)}
            </Typography>
            <span
              className={classNames(
                styles["MarketCard__header__content__subheader__change-perc"],
                marketData.twentyFourHr.priceChangePercentage !== 0 &&
                  (marketData.twentyFourHr.priceChangePercentage > 0
                    ? styles["MarketCard__header__content__subheader__change-perc--up"]
                    : styles["MarketCard__header__content__subheader__change-perc--down"]),
                themeType === "dark"
                  ? styles["MarketCard__header__content__subheader__change-perc--theme-dark"]
                  : styles["MarketCard__header__content__subheader__change-perc--theme-light"]
              )}
            >
              {twentyFourChangePercIcon}

              <Typography
                className={classNames(
                  styles["MarketCard__header__content__subheader__change-perc__text"],
                  !twentyFourChangePercIcon
                    ? styles["MarketCard__header__content__subheader__change-perc__text--zero"]
                    : null
                )}
                component="span"
              >
                {marketData.twentyFourHr.priceChangePercentage} %
              </Typography>
            </span>
          </>
        }
        action={
          <IconButton
            color={marketData.starred ? "primary" : "default"}
            size={SM_AND_BELOW_SCREEN_WIDTHS.includes(screenWidth) ? "small" : "medium"}
            disabled={loadingMarketsData}
            onClick={() => setMarketStar(marketData.name.market, !marketData.starred)}
          >
            {marketData.starred ? <StarRounded /> : <StarOutlineRounded />}
          </IconButton>
        }
      />

      <CardContent className={styles.MarketCard__content}>
        {marketPriceChartData ? (
          <div className={styles.MarketCard__content__graph}>
            <Sparklines
              data={priceChartDataPoints}
              width={SM_AND_BELOW_SCREEN_WIDTHS.includes(screenWidth) ? 268 : 318}
              height={SM_AND_BELOW_SCREEN_WIDTHS.includes(screenWidth) ? 75 : 100}
            >
              <SparklinesLine
                color={
                  // eslint-disable-next-line no-nested-ternary
                  priceChartDataPoints[0] === priceChartDataPoints[priceChartDataPoints.length - 1]
                    ? themeType === "dark"
                      ? "#ffffff"
                      : "#000000"
                    : priceChartDataPoints[0] < priceChartDataPoints[priceChartDataPoints.length - 1]
                    ? palette.successMain
                    : palette.errorMain
                }
                style={{ fill: "none" }}
              />
            </Sparklines>
          </div>
        ) : (
          <div className={styles["MarketCard__content__graph-shimmer"]} />
        )}

        {marketPriceChartData && (
          <Typography
            className={styles["MarketCard__content__graph-duration"]}
            variant="caption"
            component="span"
            color="textSecondary"
          >
            24 Hr chart
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

MarketCard.propTypes = {
  marketData: PropTypes.exact({
    name: PropTypes.exact({
      market: PropTypes.string.isRequired,
      currency: PropTypes.string.isRequired,
      exchangingCurrency: PropTypes.string.isRequired,
      quotationCurrency: PropTypes.string.isRequired,
    }).isRequired,
    coinGeckoId: PropTypes.string.isRequired,
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
  }).isRequired,
  loadingMarketsData: PropTypes.bool.isRequired,
  setMarketStar: PropTypes.func.isRequired,
  className: PropTypes.string,
};

MarketCard.defaultProps = {
  className: undefined,
};

export default MarketCard;
