import React from "react";
import styles from './MarketPrice.module.scss'

interface MarketingPriceType
{
  data: {
    openingPrice: string;
    highestPrice: string;
    lowestPrice: string;
    closingPrice: string;
    pointOfMarket: number;
    percentageOfMarket: number;
  }
}


export default function MarketPrice(prop: MarketingPriceType) {
  return (
    <div className={styles.marketPriceContainer}>
      <div className={styles.closingPrice}>
        <div>收盤價</div>
        <div>{ prop.data.closingPrice }</div>
      </div>
      <div className={styles.priceData}>
        <div>
          <div>開盤價</div>
          <div>{ prop.data.openingPrice }</div>
        </div>
        <div>
          <div>收盤價</div>
          <div>{ prop.data.closingPrice }</div>
        </div>
        <div>
          <div>最高價</div>
          <div>{ prop.data.highestPrice }</div>
        </div>
        <div>
          <div>最低價</div>
          <div>{ prop.data.lowestPrice }</div>
        </div>
        <div>
          <div>漲跌點數</div>
          <div>{ prop.data.pointOfMarket }</div>
        </div>
        <div>
          <div>漲跌百分比</div>
          <div>{ prop.data.percentageOfMarket }</div>
        </div>


      </div>
    </div>
  )
}