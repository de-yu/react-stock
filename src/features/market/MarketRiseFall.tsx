import React from 'react'
import styles from '@/features/market/MarketRiseFall.module.scss'

interface RiseFallItem {
  type: string
  sum: number
}


export default function MarketRiseFall(props: {data: RiseFallItem[]}) {
  
  const list = props.data.map((item: RiseFallItem) => {
    return (
      <div className={styles.listItem} key={item.type}>
        <div className={styles.listCell}>{ item.type }</div>
        <div className={styles.listCell}>{ item.sum }</div>
      </div>
    )
  }) 
  return (
    <div className={styles.main}>
      <div>漲跌證券數統計</div>
      <div className={styles.list}>
        <div className={styles.listHeader}>
          <div className={styles.listCell}>類型</div>
          <div className={styles.listCell}>家數</div>
        </div>
        {list}
      </div>
    </div>
  )
}