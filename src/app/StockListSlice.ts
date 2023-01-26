import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { gql } from '@apollo/client';
import { RootState } from '@/app/store';
import GraphClient from '@/api/ApolloClient'
import Query from '@/api/Query';
import {forEach} from 'lodash-es'

interface StockBasicType
{
  id: string;
  name: string;
  type: string;
  openingPrice: number;
  highestPrice: number;
  lowestPrice: number;
  closingPrice: number;
  diffPrice: number;
  diffOfPercentage: number;
  tradingVolumn: number;
  tradingShares: number;
  tradingUnits: number;
  capital: number;
  market: string;
}

interface StockListSelect {
  text: string
  key: string
}

export interface StockListDataState {
  marketStockList: StockBasicType[]
}


const initialState: StockListDataState = {
  marketStockList: []
}


export const stockListGql = createAsyncThunk(
  'stockList/getList',
  async() => {
    const response: any = await GraphClient.query({ query: gql`${Query.marketStockList}` });
    console.log(response)
    return response.data
  }
)


export const stockListSlice = createSlice({
  name: 'stockList',
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    builder.addCase(stockListGql.fulfilled, (state, action) => {
      state.marketStockList = action.payload.marketStockList.data
    })
  }

})

export const getMarketStockName = (state:RootState) => {
  const temp: StockListSelect[] = [];

  forEach((state.stockList.marketStockList), (item: StockBasicType) => {
    temp.push({
      text: `${item.id} ${item.name}`,
      key: item.id,
    });
  });

  return temp;
}

export default stockListSlice.reducer