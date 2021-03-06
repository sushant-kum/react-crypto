/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date May 22 2021 14:27:19 GMT+05:30
 * @modify date May 31 2021 13:09:15 GMT+05:30
 * @desc Data models for market ticker data and API response
 */

export interface BuyUCoinTickerDataApiResponse {
  status: string;
  sub_status: null;
  data: BuyUCoinTickerDataMetricesApiResponse[];
}

export interface BuyUCoinTickerDataMetricesApiResponse {
  bid: number;
  ask: number;
  sprd: number;
  tVolAsk: number;
  tVolBid: number;
  h24: number;
  l24: number;
  v24: number;
  tp24: number;
  LTRate: number;
  LTVol: number;
  LBRate: number;
  LBVol: number;
  LSRate: number;
  LSVol: number;
  c24: number;
  c24p: number;
  marketName: string;
  currToName: string;
}

export interface CoinGeckoCoinsListApiElement {
  id: string;
  symbol: string;
  name: string;
}

export interface MarketData {
  name: {
    market: string;
    currency: string;
    exchangingCurrency: string;
    quotationCurrency: string;
  };
  coinGeckoId: string;
  icons: {
    selfHosted: {
      black: string | null;
      white: string | null;
    };
    buyUCoin: string | null;
  };
  bestBid: number;
  bestAsk: number;
  bidAskDiffPerc: number;
  totalLimitOrderVolume: {
    bid: number;
    ask: number;
  };
  twentyFourHr: {
    highestPrice: number;
    lowestPrice: number;
    tradedVolume: number;
    tradedVolumeQuotationCurrency: number;
    priceChange: number;
    priceChangePercentage: number;
  };
  lastTrade: {
    price: number;
    volume: number;
  };
  lastBuy: {
    price: number;
    volume: number;
  };
  lastSell: {
    price: number;
    volume: number;
  };
  starred: boolean;
}

export const parseMarketDataApiResponse: (
  buyUCoinMarketDataApiResponse: BuyUCoinTickerDataApiResponse,
  coinGeckoCoinsList: CoinGeckoCoinsListApiElement[],
  starredMarkets: string[]
) => MarketData[] = (buyUCoinMarketDataApiResponse, coinGeckoCoinsList, starredMarkets) => {
  const consideredCoins: MarketData[] = [];

  buyUCoinMarketDataApiResponse.data.forEach((metrices: BuyUCoinTickerDataMetricesApiResponse) => {
    const coinGeckoSymbolMatches: CoinGeckoCoinsListApiElement[] = coinGeckoCoinsList.filter(
      (coin: CoinGeckoCoinsListApiElement) =>
        coin.symbol.toLowerCase() === metrices.marketName.split("-")[1].toLowerCase()
    );

    let coinGeckoId: string | undefined;

    if (coinGeckoSymbolMatches.length === 1) {
      coinGeckoId = coinGeckoSymbolMatches[0].id;
    } else if (coinGeckoSymbolMatches.length > 1) {
      coinGeckoId = coinGeckoSymbolMatches.filter(
        (coin: CoinGeckoCoinsListApiElement) =>
          coin.id.toLowerCase() === metrices.currToName.toLowerCase() ||
          coin.name.toLowerCase() === metrices.currToName.toLowerCase()
      )[0]?.id;
    } else {
      coinGeckoId = undefined;
    }

    if (coinGeckoId !== undefined) {
      const marketData: MarketData = {
        name: {
          market: metrices.marketName,
          currency: metrices.currToName,
          exchangingCurrency: metrices.marketName.split("-")[1],
          quotationCurrency: metrices.marketName.split("-")[0],
        },
        coinGeckoId,
        icons: {
          selfHosted: {
            black: `/assets/images/crypto-icons/svg/black/${metrices.marketName.split("-")[1].toLowerCase()}.svg`,
            white: `/assets/images/crypto-icons/svg/white/${metrices.marketName.split("-")[1].toLowerCase()}.svg`,
          },
          buyUCoin: `https://d33epyjwhmr3r5.cloudfront.net/assets/images/currency/${metrices.marketName
            .split("-")[1]
            .toLowerCase()}.png`,
        },
        bestBid: +metrices.bid,
        bestAsk: +metrices.ask,
        bidAskDiffPerc: +metrices.sprd,
        totalLimitOrderVolume: {
          bid: +metrices.tVolBid,
          ask: +metrices.tVolAsk,
        },
        twentyFourHr: {
          highestPrice: +metrices.h24,
          lowestPrice: +metrices.l24,
          tradedVolume: +metrices.v24,
          tradedVolumeQuotationCurrency: +metrices.tp24,
          priceChange: +metrices.c24,
          priceChangePercentage: +metrices.c24p,
        },
        lastTrade: {
          price: +metrices.LTRate,
          volume: +metrices.LTVol,
        },
        lastBuy: {
          price: +metrices.LBRate,
          volume: +metrices.LBVol,
        },
        lastSell: {
          price: +metrices.LSRate,
          volume: +metrices.LSVol,
        },
        starred: starredMarkets.includes(metrices.marketName),
      };

      consideredCoins.push(marketData);
    }
  });

  return consideredCoins;
};
