import React from 'react'
import { useDispatch } from 'react-redux'
import {  toggleSelectProd,
          setProdData } from '../../../redux/orderSlice'
import styles from './styles/Prod.module.css'
import { IconButton, TitleInput } from '../Core'
import {  icon_unselect, 
          icon_select } from '../../assets/icon'

export default function Prod({prodData, orderIndex, prodIndex, editing}) {
    const dispatch = useDispatch()

    return (
        <div className={styles.container}>
          <IconButton 
            src={prodData.stats.select? icon_select: icon_unselect}
            onClick={() => 
              dispatch(toggleSelectProd([orderIndex, prodIndex]))}
          />
          <div className={styles.prodInfo}>
            <TitleInput
              title='Tên sản phẩm(¥)'
              value={prodData.displayData.prodName}
              flex={1}
              editing={editing}
              onChange={value => 
                dispatch(setProdData([orderIndex, prodIndex, 'prodName', value]))}
            />
            <div>
              <TitleInput
                title='Số lượng'
                value={prodData.displayData.quantity}
                width={60}
                editing={editing}
                onChange={value => 
                  dispatch(setProdData([orderIndex, prodIndex, 'quantity', value]))}
              />
              <TitleInput
                title='Giá mua(¥)'
                value={prodData.displayData.buyPrice}
                flex={1}
                editing={editing}
                onChange={value => 
                  dispatch(setProdData([orderIndex, prodIndex, 'buyPrice', value]))}
              />
              <TitleInput
                title='Giá bán(¥)'
                value={prodData.displayData.sellPrice}
                flex={1}
                editing={editing}
                onChange={value => 
                  dispatch(setProdData([orderIndex, prodIndex, 'sellPrice', value]))}
              />
              <TitleInput
                title='Tiền gửi(¥)'
                value={prodData.displayData.postPrice}
                flex={1}
                editing={editing}
                onChange={value => 
                  dispatch(setProdData([orderIndex, prodIndex, 'postPrice', value]))}
              />
            </div>
            <TitleInput
              title='Mã hàng'
              value={prodData.displayData.postCode}
              flex={1}
              editing={editing}
              onChange={value => 
                dispatch(setProdData([orderIndex, prodIndex, 'postCode', value]))}
            />
          </div>
        </div>
  )
}
