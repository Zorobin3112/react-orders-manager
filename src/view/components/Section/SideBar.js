import React from 'react'
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '../../../redux/orderSlice'
import styles from './styles/SideBar.module.css'

export default function SideBar({onClickBar}) {
  const filterKey = useSelector(state => state.store.filter.key)
  const dispatch = useDispatch()
    
  return (
    <div className={styles.container}>
      <div 
        className={clsx(styles.row, {
          [styles.select]: filterKey === 'all'
        })}
        onClick={() => {
          onClickBar()
          dispatch(setFilter('all'))
        }}
      > 
        Hiện tất cả đơn hàng
      </div>
      <div 
        className={clsx(styles.row, {
          [styles.select]: filterKey === 'active'
        })}
        onClick={() => {
          onClickBar()
          dispatch(setFilter('active'))
        }}
      > 
        Chỉ hiện đơn hàng đang mua
      </div>
      <div 
        className={clsx(styles.row, {
          [styles.select]: filterKey === 'complete'
        })}
        onClick={() => {
          onClickBar()
          dispatch(setFilter('complete'))
        }}
      > 
        Chỉ hiện đơn hàng đã xong
      </div>
      <div
        className={styles.footer}
      >Viết bởi Nguyễn Văn Khánh</div>
    </div>
  )
}
