import React from 'react'
import HistoricalStockGraph from '@/components/HistoricalStockGraph'
import styles from '@/features/market/MarketHistoricalGraph.module.scss'

import {map} from 'lodash-es'
interface HistoricalData {
  data: Array<{
    date: string;
    openingPrice: number;
    highestPrice: number;
    lowestPrice: number;
    closingPrice: number;
    reductionPrice: number;
  }>
}


export default function MarketHistoricalGraph(props: HistoricalData) {


  const historyDates = map(props.data, 'date');
  const historyPrice = map(props.data, (data) => [
    data.openingPrice,
    data.closingPrice,
    data.lowestPrice,
    data.highestPrice,
  ]);

  const historyVolumn = map(props.data, 'volumn');
  return (
    <div className={styles.graph}>
      <HistoricalStockGraph dates={historyDates} price={historyPrice} volumns={historyVolumn} />
    </div>
  )
}