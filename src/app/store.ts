import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import MarketReducer from './MarketSlice';
import MemberReducer from '@/app/MemberSlice'
import StockRecordReducer  from '@/app/StockRecordSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    market: MarketReducer,
    member: MemberReducer,
    stockRecord: StockRecordReducer
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
