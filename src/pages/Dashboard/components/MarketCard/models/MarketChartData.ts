/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date Jun 08 2021 18:06:12 GMT+05:30
 * @modify date Jun 08 2021 18:06:12 GMT+05:30
 * @desc Data models for chart data
 */

export interface CoinGeckoMarketChartDataApiResponse {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

export interface ChartDataPoint {
  unixTimeStamp: number;
  value: number;
}

export interface MarketChartData {
  market: string;
  chartData: ChartDataPoint[];
}

export const parseMarketChartData: (
  market: string,
  coinGeckoMarketChartDataApiResponse: CoinGeckoMarketChartDataApiResponse,
  parameter: "prices" | "market_caps" | "total_volumes"
) => MarketChartData = (market, coinGeckoMarketChartDataApiResponse, parameter) => {
  const chartData: ChartDataPoint[] = coinGeckoMarketChartDataApiResponse[parameter].map(
    (chartDataPoint: [number, number]) => ({
      unixTimeStamp: chartDataPoint[0],
      value: chartDataPoint[1],
    })
  );
  const marketsChartData: MarketChartData = {
    market,
    chartData,
  };

  return marketsChartData;
};
