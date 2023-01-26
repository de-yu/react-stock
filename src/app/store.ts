import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import MarketReducer from '@/app/MarketSlice';
import MemberReducer from '@/app/MemberSlice'
import StockRecordReducer  from '@/app/StockRecordSlice';
import StockListReducer from '@/app/StockListSlice';


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    market: MarketReducer,
    member: MemberReducer,
    stockRecord: StockRecordReducer,
    stockList: StockListReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
