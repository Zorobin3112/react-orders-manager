import React, { useMemo, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { storeData, getData } from '../../../redux/storage'
import {  loadData, setFilter } from '../../../redux/orderSlice'
import styles from './styles/MainForm.module.css'
import { AppHeader, Footer, Order } from '../Section'
import { updateDataStruct } from '../../../redux/template.js'

export default function MainForm() {
  const state = useSelector(state => state.store)  
  const { appStats, orders, filter } =  state
  const dispatch = useDispatch()
  
  //Load/Save Data
  useMemo(() => {
    const loadedData = updateDataStruct(getData())
    if(loadedData) {
      dispatch(loadData(loadedData))
    }
    console.log('Load');
  }, [dispatch])

  useEffect(() => {
    storeData({appStats, orders})
    console.log('Saved');
  }, [appStats, orders, filter])

  //set Filter
  useMemo(() => {
    dispatch(setFilter('active'))
  }, [dispatch])
  
  console.log('Main Render')
  return (
    <div className={styles.container}>
      <AppHeader/>
      <ul className={styles.orderList}>
        {filter.displayIndexList.reduce((result, orderIndex) => {
          return result = [...result, 
            <Order 
              contentData={orders[orderIndex]}
              orderIndex={orderIndex}
              key={orderIndex}
            />
          ]
        },[])
      }
      </ul>
      <div className={styles.endBlock}></div>
      <Footer
        appStats={appStats}
      />
    </div>
  )
}
