/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date Aug 11 2021 21:11:47 GMT+05:30
 * @modify date Aug 11 2021 21:11:47 GMT+05:30
 * @desc Data models for market data
 */

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
