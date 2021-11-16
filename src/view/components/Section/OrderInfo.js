import React from 'react'
import { useDispatch } from 'react-redux'
import {  setOrderData  } from '../../../redux/orderSlice'
import styles from './styles/OrderInfo.module.css'
import { TitleInput } from '../Core'


export default function OrderInfo({totalPrice, note, creatingDate, completeDate, editing, orderIndex}) {
  const dispatch = useDispatch()
  return (
    <div className={styles.container}>
      <div>
        <TitleInput
          title='Tổng(¥)'
          value={totalPrice}
          width={60}
        />
        <TitleInput
          title='Ghi chú'
          value={note}
          flex={1}
          editing={editing}
          onChange={value => 
            dispatch(setOrderData([orderIndex, 'note', value]))}
        />
      </div>
      <TitleInput
          title='Ngày tạo'
          value={creatingDate.dateToString}
          flex={1}
          onChange={value => 
            dispatch(setOrderData([orderIndex, 'creatingDate', value]))}
      />
      {completeDate === null? null:
        <TitleInput
          title='Ngày hoàn thành'
          value={completeDate !== null && completeDate.dateToString}
          flex={1}
          onChange={value => 
            dispatch(setOrderData([orderIndex, 'completeDate', value]))}
        />
      }
    </div>
  )
}
