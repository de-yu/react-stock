import React, {useEffect} from "react";
import styles from '@/features/market/Market.module.scss';
import MarketPrice from "@/features/market//MarketPrice";
import MarketDeal from "@/features/market/MarketDeal";
import MarketRiseFall from "@/features/market/MarketRiseFall";
import { useDispatch, useSelector } from 'react-redux';
import {marketPrice, marketDeal, marketingGql, marketHistory, marketRiseFall} from '../../app/MarketSlice'
import {AppDispatch} from '../../app/store'
import MarketHistoricalGraph from "./MarketHistoricalGraph";

export default function Market() {

  const dispatch = useDispatch<AppDispatch>();
  const marketPriceData = useSelector(marketPrice);
  const marketDealData = useSelector(marketDeal);
  const marketHistoryData = useSelector(marketHistory);
  const marketRiseFallData = useSelector(marketRiseFall);

  useEffect(() => {
    dispatch(marketingGql())
  }, [])

  return (
    <div className="ms-Grid">
      <div className={styles.row}>
        <div className={"ms-Grid-col ms-sm6 " + styles.block}>
          <MarketPrice data={marketPriceData}></MarketPrice>
        </div>
        <div className={"ms-Grid-col ms-sm3 "  + styles.block}>
          <MarketDeal data={marketDealData}></MarketDeal>
        </div>
        <div className={"ms-Grid-col ms-sm3 " + styles.block}>
          <MarketRiseFall data={marketRiseFallData}></MarketRiseFall>
        </div>
        <div className={"ms-Grid-col ms-sm12 " + styles.block}>
          <MarketHistoricalGraph data={marketHistoryData}></MarketHistoricalGraph>
        </div>
      </div>
    </div>
  )
}