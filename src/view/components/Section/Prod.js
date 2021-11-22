import React from 'react'
import clsx from 'clsx'
import { useMyStore } from '$my-redux/hooks'
import {  changeItemInfo, 
          toggleSelectProd, 
          toggleInStockProd } from '$my-redux/slice'
import styles from './styles/Prod.module.css'
import { IconButton, TitleInput } from '$components/core'
import {  icon_unselect, 
          icon_select } from '$assets/icon'

export default function Prod({id, forceUneditable = false, page}) {
    const {orders, packages, prods, dispatch} = useMyStore()
    const prod = prods[id]
    const {stats: {selecting, editing}} = page === 'order'?
      orders[prod.parents.orderID]: packages[prod.parents.packageID]

    return (
        <div className={styles.container}>
          <IconButton 
            src={selecting.includes(id)? icon_select: icon_unselect}
            onClick={() => dispatch(toggleSelectProd([page, id]))}
          />
          <div className={styles.prodInfo}>
            <TitleInput
              title='Tên sản phẩm(¥)'
              value={prod.info.name}
              flex={1}
              editing={!forceUneditable&&editing}
              onChange={value => dispatch(changeItemInfo(['prod', id, 'name', value]))}
            />
            <div>
              <TitleInput
                title='Số lượng'
                value={prod.info.quantity}
                width={80}
                editing={!forceUneditable&&editing}
                onChange={value => dispatch(changeItemInfo(['prod', id, 'quantity', value]))}
              />
              <TitleInput
                title='Giá mua(¥)'
                value={prod.info.buyPrice}
                flex={1}
                editing={!forceUneditable&&editing}
                onChange={value => dispatch(changeItemInfo(['prod', id, 'buyPrice', value]))}
              />
              <TitleInput
                title='Giá bán(¥)'
                value={prod.info.sellPrice}
                flex={1}
                editing={!forceUneditable&&editing}
                onChange={value => dispatch(changeItemInfo(['prod', id, 'sellPrice', value]))}
              />
            </div>
            <div>
              <TitleInput
                title='Mã hàng'
                value={prod.info.code}
                flex={1}
                editing={!forceUneditable&&editing}
                onChange={value => dispatch(changeItemInfo(['prod', id, 'code', value]))}
              />
              <button 
                className={clsx(styles.statButton, {
                  [styles.inStock]: prod.stats.inStock
                })}
                onClick={e => dispatch(toggleInStockProd(id))}
              >
                {prod.stats.inStock? 'Đã tới kho': 'Đang mua'}
              </button>
            </div>
          </div>
        </div>
  )
}
