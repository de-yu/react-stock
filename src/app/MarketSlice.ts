import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { gql } from '@apollo/client';
import { RootState } from '@/app/store';
import GraphClient from '@/api/ApolloClient'
import Query from '@/api/Query';
import {map} from 'lodash-es'
import { toThousand, numberExpress, numberFixed } from '@/utility/utility';
interface MarketHistoryType
{
  date: string;
  openingPrice: number;
  highestPrice: number;
  lowestPrice: number;
  closingPrice: number;
  reductionPrice: number;
}

interface MarketStatisticType
{
  marketName: string;
  closingPrice: number;
  pointOfMarket: number;
  percentageOfMarket: number;
}

interface MarketInvestmentMechanismType
{
  name: string;
  buy: number;
  sell: number;
  gap: number;
}


export interface MarketDataState {
  marketPrice: {
    openingPrice: number;
    highestPrice: number;
    lowestPrice: number;
    closingPrice: number;
    pointOfMarket: number
    percentageOfMarket: number;
  }
  marketDeal: {
    dealSumOfShare: number;
    dealSumOfMoney: number;
    dealSumOfTransaction: number;
    marketIndex: number;
    pointOfMarket: number;
  }
  marketHistory: MarketHistoryType[];
  marketRiseFall: {
    sumOfRise: number;
    sumOfRiseLimit: number;
    sumOfDown: number;
    sumOfDownLimit: number;
    sumOfEqual: number;
  }
  marketStatistic: MarketStatisticType[]
  marketInvestMechanism: MarketInvestmentMechanismType[]
}

const initialState: MarketDataState = {
  marketPrice: {
    openingPrice: 0,
    highestPrice: 0,
    lowestPrice: 0,
    closingPrice: 0,
    pointOfMarket: 0,
    percentageOfMarket: 0,
  },
  marketDeal: {
    dealSumOfShare: 0,
    dealSumOfMoney: 0,
    dealSumOfTransaction: 0,
    marketIndex: 0,
    pointOfMarket: 0,
  },
  marketHistory: [],
  marketRiseFall: {
    sumOfRise: 0,
    sumOfRiseLimit: 0,
    sumOfDown: 0,
    sumOfDownLimit: 0,
    sumOfEqual: 0,
  },
  marketStatistic: [],
  marketInvestMechanism: [],
}


export const marketingGql = createAsyncThunk(
  'market/getData',
  async() => {
    const response: any = await GraphClient.query({ query: gql`${Query.marketing}` });
    return response.data
  }
)

export const marketSlice = createSlice({
  name: 'market',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<any>) => {
     
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(marketingGql.fulfilled, (state, action) => {
        state.marketPrice = {
          ...state.marketPrice,
          ...action.payload.marketData.MarketPrice
        }
        state.marketDeal = {
          ...state.marketDeal,
          ...action.payload.marketData.MarketDeal
        }
        state.marketHistory = {
          ...state.marketHistory,
          ...action.payload.marketData.MarketHistory
        }
        state.marketRiseFall = {
          ...state.marketRiseFall,
          ...action.payload.marketData.MarketRiseFall
        }
        state.marketInvestMechanism = {
          ...state.marketInvestMechanism,
          ...action.payload.marketInvestmentMechanism.data
        }
      })
     
  },
})

export const {setData} = marketSlice.actions
export const marketPrice = (state: RootState) => {
  return {
    openingPrice: state.market.marketPrice.openingPrice.toFixed(2),
    highestPrice: state.market.marketPrice.highestPrice.toFixed(2),
    lowestPrice: state.market.marketPrice.lowestPrice.toFixed(2),
    closingPrice: state.market.marketPrice.closingPrice.toFixed(2),
    pointOfMarket: state.market.marketPrice.pointOfMarket,
    percentageOfMarket: state.market.marketPrice.percentageOfMarket,
  }
}

export const marketDeal = (state: RootState) => {
  return  {
    dealSumOfShare: numberExpress(state.market.marketDeal.dealSumOfShare),
    dealSumOfMoney: numberExpress(state.market.marketDeal.dealSumOfMoney),
    dealSumOfTransaction: toThousand(state.market.marketDeal.dealSumOfTransaction),
    marketIndex: state.market.marketDeal.marketIndex,
    pointOfMarket: state.market.marketDeal.pointOfMarket,
  }
}

export const marketHistory = (state: RootState) => {
  const temp = map(state.market.marketHistory, (item) => ({
    date: item.date,
    openingPrice: numberFixed(item.openingPrice, 2),
    highestPrice: numberFixed(item.highestPrice, 2),
    lowestPrice: numberFixed(item.lowestPrice, 2),
    closingPrice: numberFixed(item.closingPrice, 2),
    reductionPrice: numberFixed(item.reductionPrice, 2),
  }));
  return temp;
}

export const marketRiseFall = (State: RootState) => {
  return [
    {
      type: '上漲',
      sum: State.market.marketRiseFall.sumOfRise,
    },
    {
      type: '漲停',
      sum: State.market.marketRiseFall.sumOfRiseLimit,
    },
    {
      type: '下跌',
      sum: State.market.marketRiseFall.sumOfDown,
    }, {
      type: '跌停',
      sum: State.market.marketRiseFall.sumOfDownLimit,
    }, {
      type: '持平',
      sum: State.market.marketRiseFall.sumOfEqual,
    },
  ]
}
export default marketSlice.reducer