/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date Aug 11 2021 21:12:39 GMT+05:30
 * @modify date Aug 11 2021 21:12:39 GMT+05:30
 * @desc Data models for market data API response
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
