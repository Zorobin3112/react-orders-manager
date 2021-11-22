import React from 'react'
import { useMyStore } from '$my-redux/hooks'
import {  changeItemInfo } from '$my-redux/slice'
import styles from './styles/OrderInfo.module.css'
import { TitleInput } from '$components/core'

export default function OrderInfo({id}) {
  const { orders, prods, dispatch } = useMyStore()
  const {info, stats, prodIDs} = orders[id]

  const totalPrice = prodIDs.reduce((total, prodID) => {
    return total + Number(prods[prodID].info.sellPrice)
  }, 0)

  return (
    <div className={styles.container}>
      <div>
        <TitleInput
          title='Tổng(¥)'
          value={totalPrice}
          width={70}
        />
        <TitleInput
          title='Ghi chú'
          value={info.note}
          flex={1}
          editing={stats.editing}
          onChange={value => dispatch(changeItemInfo(['order', id, 'note', value]))}
        />
      </div>
      <TitleInput
          title='Ngày tạo'
          value={info.creatingDate}
          flex={1}
      />
      {info.completeDate === ''? null:
        <TitleInput
          title='Ngày hoàn thành'
          value={info.completeDate}
          flex={1}
        />
      }
    </div>
  )
}
