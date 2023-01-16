
import React from "react";
import styles from './MarketDeal.module.scss'

interface MarketDealType
{
  data: {
    dealSumOfShare: number | string;
    dealSumOfMoney: number | string;
    dealSumOfTransaction: number | string;
    marketIndex: number;
    pointOfMarket: number;
  }
}


export default function MarketDeal(props: MarketDealType) {
  return (
    <div className={styles.deal}>
      <div>交易資訊</div>
      <div className={styles.row}>
        <div className={styles.name}>成交金額</div>
        <div>{ props.data.dealSumOfMoney }億元</div>
      </div>
      <div className={styles.row}>
        <div className={styles.name}>成交股數</div>
        <div>{ props.data.dealSumOfShare }億股</div>
      </div>
      <div className={styles.row}>
        <div className={styles.name}>成交筆數</div>
        <div>{ props.data.dealSumOfTransaction }</div>
      </div>
    </div>
  )

}