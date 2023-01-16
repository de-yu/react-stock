const Query = {
  marketing: `
  query market
  {
    marketData {
      MarketPrice{
        flatPrice
        openingPrice
        highestPrice
        lowestPrice
        closingPrice
        pointOfMarket
        percentageOfMarket
      }
      MarketDeal {
        dealSumOfShare
        dealSumOfMoney
        dealSumOfTransaction
      }
      MarketHistory {
        date
        openingPrice
        highestPrice
        lowestPrice
        closingPrice
        reductionPrice
        volumn
      }
      MarketRiseFall {
        sumOfRise
        sumOfRiseLimit
        sumOfDown
        sumOfDownLimit
        sumOfEqual
      }
      MarketStatistic {
        marketName
        closingPrice
        pointOfMarket
        percentageOfMarket
      }
    }
    
    marketInvestmentMechanism {
      data {
        name
        buy
        sell
        gap
      }
    }
  }`,
  marketStockList: `
  {
    marketStockList{
      headers {
        date
      }
      data {
        id
        name
        type
        openingPrice
        highestPrice
        lowestPrice
        closingPrice
        diffPrice
        diffOfPercentage
        tradingVolumn
        tradingShares
        tradingUnits
        capital
        market
      }
    }
    cabinetStockList{
      data {
        id
        name
        type
        openingPrice
        highestPrice
        lowestPrice
        closingPrice
        diffPrice
        diffOfPercentage
        tradingVolumn
        tradingShares
        tradingUnits
        capital
        market
      }
    }
    
  }
  `,
  marketStock: `
 
  query market($id: String){
    marketStock(id: $id){
      headers {
        date
      }
      data {
        id
        name
        type
        openingPrice
        highestPrice
        lowestPrice
        closingPrice
        diffPrice
        diffOfPercentage
        tradingVolumn
        tradingShares
        tradingUnits
        capital
      }
    }
    marketStockHistory(id: $id){
      data {
        date
        openingPrice
        highestPrice
        lowestPrice
        closingPrice
        volumn
      }
    }
    marketStockMonthRevenue(id: $id) {
      data {
        date
        id
        nowMonthRevenue
        previousMonthRevenue
        previousYearRevenue
        previousMonthChangeRate
        previousYearChangeRate
        accumulation
        previousAccumulation
        accumulationChangeRate
        remark
      }
    }
    marketStockInvestmentMechanism(id: $id) {
      data {
        id
        foreignInvestment
        credit
        selfEmployed
        threeMechanism

      }
    }
  }

`,
  getNoteList: `
  {
    notesList {
      _id
      title
    }
  }
`,
  getNote: `
  query getNote($stockId: String!) {
    getNote(stockId: $stockId){
      _id
      content
    }
  }  
`,
  login: `
query login($data: Member!){
  login(data: $data) {
    status
    code
    data
  }
}`,
  verify: `{
  verify {
    status
    code
    data {
      account
      authority
    }
  }
}
`,
  tracingStock: `
{
  tracingStock {
    data {
      id
      name
      closingPrice
      diffPrice
      diffOfPercentage
    }
  }
}
`,
  stockVolumnRank: `{
  marketStockVolumnRank {
    status
    data {
      type
      tradingVolumn
      tradingVolumnPoint
    }
  }
}`,
  investmentMechanismSummary: ` {
  marketStockInvestmentMechanism {
    data {
      id
      name
      foreignInvestment
      credit
      selfEmployed
      threeMechanism

    }
  }
} `,
  cabinetStock: `
query cabinet($id: String){
  cabinetStock(id: $id){
    data {
      id
      name
      type
      openingPrice
      highestPrice
      lowestPrice
      closingPrice
      diffPrice
      diffOfPercentage
      tradingVolumn
      tradingShares
      tradingUnits
      capital
    }
  }
  cabinetStockHistory(id: $id){
    data {
      date
      openingPrice
      highestPrice
      lowestPrice
      closingPrice
      volumn
    }
  }
}
`,
  stockRecord: `{
  record {
   title
    items {
      stock
      factor
    }
  }
}`,

};

export default Query;
