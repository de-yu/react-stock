import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '@/app/store';

import Mutation from '@/api/Mutation';
import { gql } from '@apollo/client';
import Query from '@/api/Query';
import GraphClient from '@/api/ApolloClient'

interface StockRecordItem {
  stock: string;
  factor: string;
}

interface StockRecord {
  title: string;
  items: StockRecordItem[];
}

interface StockRecordData {
  content: StockRecord[]
}

interface AddStockRecordItem {
  index: number
  stock: string;
  factor: string;
}


const initialState: StockRecordData = {
  content: []
}

export const getStockRecords = createAsyncThunk(
  'stockRecord/getData',
  async() => {
    const response: any = await GraphClient.query({
      query: gql`${Query.stockRecord}`,
    });
    return response.data
  }
)

export const saveStockRecords = createAsyncThunk(
  'stockRecord/save',
  async(content: StockRecord[]) => {
    const response: any = await GraphClient.mutate({
      mutation: gql`${Mutation.updateStockRecord}`,
      variables: {
        content: JSON.stringify(content),
      },
    });

    return response
  }
)


export const stockRecordSlice = createSlice({
  name: 'stockRecord',
  initialState,
  reducers: {
    newRecord:(state) => {
      state.content = [
        ...state.content,
        {
          title:'hi',
          items:[]
        }
      ]
    },
    addRecordItem: (state, action:PayloadAction<AddStockRecordItem>) => {
      state.content[action.payload.index].items = [
        ...state.content[action.payload.index].items,
        {
          stock:action.payload.stock,
          factor: action.payload.factor
        }
      ]
    },
    deleteRecord: (state, action:PayloadAction<number>) => {
      state.content = [
        ...state.content.slice(0, action.payload),
        ...state.content.slice(action.payload + 1)
      ]
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getStockRecords.fulfilled, (state, action) => {
      
      state.content = action.payload.record
    })
  }
})

export const {addRecordItem, deleteRecord,newRecord} = stockRecordSlice.actions

export const stockRecords = (state: RootState) => state.stockRecord.content

export default stockRecordSlice.reducer