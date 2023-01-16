import React, {useEffect} from "react";
import styles from '@/features/market/Market.module.scss';
import MarketPrice from "./MarketPrice";
import MarketDeal from "./MarketDeal";
import { useDispatch, useSelector } from 'react-redux';
import {marketPrice, marketDeal, marketingGql, marketHistory} from '../../app/MarketSlice'
import {AppDispatch} from '../../app/store'
import MarketHistoricalGraph from "./MarketHistoricalGraph";

export default function Market() {

  const dispatch = useDispatch<AppDispatch>();
  const marketPriceData = useSelector(marketPrice);
  const marketDealData = useSelector(marketDeal);
  const marketHistoryData = useSelector(marketHistory)

  useEffect(() => {
    dispatch(marketingGql())
  }, [])

  return (
    <div className="ms-Grid">
      <div className={styles.row}>
        <div className="ms-Grid-col ms-sm6">
          <MarketPrice data={marketPriceData}></MarketPrice>
        </div>
        <div className="ms-Grid-col ms-sm3">
          <MarketDeal data={marketDealData}></MarketDeal>
        </div>
        <div className="ms-Grid-col ms-sm3">
        </div>
        <div className="ms-Grid-col ms-sm12">
          <MarketHistoricalGraph data={marketHistoryData}></MarketHistoricalGraph>
        </div>
      </div>
    </div>
  )
}