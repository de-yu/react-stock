
import React, {useRef, useEffect} from 'react';
import ReactECharts from 'echarts-for-react';
import { calculateMA } from '@/utility/TechnicalAnalysis';
import {map} from 'lodash-es'

interface HistoricalData {
  dates: string[]
  price: number[][]
  volumns: number[]
}


export default function HistoricalStockGraph(props: HistoricalData) {

  const upColor = '#ec0000';
  const upBorderColor = '#8A0000';
  const downColor = '#00da3c';
  const downBorderColor = '#008F28';
  const init = {
    height:500
  }
  const options = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    legend: {
      data: ['日K', '成交量', 'MA5', 'MA10', 'MA20', 'MA60'],
      top: 40,
    },
    grid: {
      top: 100,
      right: 100,
      left: 0,
    },
    xAxis: {
      type: 'category',
      scale: true,
      boundaryGap: false,
      axisLine: { onZero: false },
      splitLine: { show: false },
      splitNumber: 20,
      min: 'dataMin',
      max: 'dataMax',
      data: props.dates
    },
    yAxis: [{
      scale: true,
      splitArea: {
        show: true,
      },
    }, {
      type: 'value',
      scale: true,
      name: '成交量',
    }],
    dataZoom: [
      {
        type: 'inside',
        start: 50,
        end: 100,
      },
      {
        show: true,
        type: 'slider',
        top: '90%',
        start: 50,
        end: 100,
      },
    ],
      series: [
        {
          name: '日K',
          type: 'candlestick',
          yAxisIndex: 0,
          data: props.price,
          itemStyle: {
            color: upColor,
            color0: downColor,
            borderColor: upBorderColor,
            borderColor0: downBorderColor,
          },
 
        },
        {
          name: '成交量',
          type: 'bar',
          yAxisIndex: 1,
          data: props.volumns,
        },
        {
          name: 'MA5',
          type: 'line',
          yAxisIndex: 0,
          data: calculateMA(5, map(props.price, (item: number[]) => item[1])),
          smooth: true,
          lineStyle: {
            opacity: 0.5,
          },
        },
        {
          name: 'MA10',
          type: 'line',
          yAxisIndex: 0,
          data: calculateMA(10, map(props.price, (item: number[]) => item[1])),
          smooth: true,
          lineStyle: {
            opacity: 0.5,
          },
        },
        {
          name: 'MA20',
          type: 'line',
          yAxisIndex: 0,
          data: calculateMA(20, map(props.price, (item: number[]) => item[1])),
          smooth: true,
          lineStyle: {
            opacity: 0.5,
          },
        },
        {
          name: 'MA60',
          type: 'line',
          yAxisIndex: 0,
          data: calculateMA(60, map(props.price, (item: number[]) => item[1])),
          smooth: true,
          lineStyle: {
            opacity: 0.5,
          },
        },
 
      ],
 
    
  };

  return (
    <ReactECharts option={options} opts={init} />
  )
}