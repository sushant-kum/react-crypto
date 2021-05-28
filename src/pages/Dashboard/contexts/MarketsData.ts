import { Context, createContext } from "react";

import { MarketData } from "../models/MarketData";

export interface MarketsDataContextValue {
  marketsData: MarketData[];
  marketsDataUpdate?: (marketsData: MarketData[]) => void;
}

export const marketsDataInitialState: MarketsDataContextValue = {
  marketsData: [],
};

const MarketsDataContext: Context<MarketsDataContextValue> =
  createContext<MarketsDataContextValue>(marketsDataInitialState);

export default MarketsDataContext;
