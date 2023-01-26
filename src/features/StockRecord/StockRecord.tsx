import React,{useState, useEffect} from 'react';
import styles from '@/features/StockRecord/StockRecord.module.scss'
import { DefaultButton } from '@fluentui/react/lib/Button';
import { ComboBox, IComboBox, IComboBoxOption, IComboBoxStyles } from '@fluentui/react';
import { useDispatch, useSelector } from 'react-redux';
import { stockRecords, addRecordItem, deleteRecord, getStockRecords,newRecord, saveStockRecords } from '@/app/StockRecordSlice';
import { stockListGql, getMarketStockName } from '@/app/StockListSlice'
import type { AppDispatch } from '@/app/store';

interface StockRecordItem {
  stock: string;
  factor: string;
}

export default function StockRecord() {

  const [showNewStock, setShowNewStock] = useState(false)
  const [newStockIndex, setNewStockIndex] = useState(-1)
  const [inputName, setInputName] = useState('')
  const [inputFactor, setInputFactor] = useState('')

  const records = useSelector(stockRecords)
  const listSelect = useSelector(getMarketStockName)
  const dispatch = useDispatch<AppDispatch>()
  const comboBoxStyles: Partial<IComboBoxStyles> = { root: { maxWidth: 300 } };
  useEffect(() => {
    dispatch(getStockRecords())
    dispatch(stockListGql())
  }, [])

  const clickNew = (event: any, index:number) => {
    setShowNewStock(true)
    setNewStockIndex(index)
  }

  const clickDel = (event: any, index: number) => {
    dispatch(deleteRecord(index))
  }

  const clickCancel =  () => {
    setShowNewStock(false)
  }

  const nameChange = (event: React.FormEvent<IComboBox>, option?: IComboBoxOption | undefined, index?: number | undefined, value?: string | undefined) => {
    console.log(value)
    if(value) {
      setInputName(value)
    }
  }

  const factorChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputFactor((event.target as HTMLInputElement).value)
  }

  const newItem = (event: any, index:number) => {
    dispatch(addRecordItem({index, stock: inputName, factor: inputFactor}))
  }

  const saveRecords = () => {
    dispatch(saveStockRecords(records))
  }

  const addNewRecord = () => {
    dispatch(newRecord())
  }

  const list = records.map((record,index) => {

      const items =  record.items.map((item:StockRecordItem, index2) => {
        return (
          <div className={styles.item} key={index2}>
            <div className={styles.itemName}>{item.stock}</div>
            <div>{item.factor}</div>
          </div>
        )
      })

      return  (
      <div className={styles.list} key={index}>
        <div>{record.title}</div>
        {items}
        <DefaultButton onClick={event => clickNew(event, index)}>新增股票</DefaultButton>
        <DefaultButton onClick={event => clickDel(event, index)}>刪除股票</DefaultButton>
        {
          showNewStock && newStockIndex===index &&
          <div>
            <ComboBox 
            options={listSelect}
            allowFreeInput
            autoComplete="on"
            onChange={nameChange}
            styles={comboBoxStyles}
            >

            </ComboBox>
            <input onChange={factorChange} />
            <div>
              <DefaultButton onClick={clickCancel}>取消</DefaultButton>
              <DefaultButton onClick={event => newItem(event, index)}>確認</DefaultButton>
            </div>
          </div>
        }
      </div>
    )
  })

  return (
    <div>
      <div>
        <DefaultButton onClick={addNewRecord}>新增分類</DefaultButton>
      </div>
      {list}
      <div>
        <DefaultButton onClick={saveRecords}>儲存</DefaultButton>
      </div>
    </div>
  )
}