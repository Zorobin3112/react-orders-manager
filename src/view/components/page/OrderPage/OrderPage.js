import React from 'react'
import { useMyStore } from '$my-redux/hooks'
import styles from './styles/OrderPage.module.css'
import OrderItem from './child/OrderItem'

export default function OrderPage() {
  const { activeOrderKey,
          completedOrderKey } = useMyStore()

  return (
    <div className={styles.container}>
      <ul className={styles.itemList}>
        {activeOrderKey.reverse().map(orderID => 
          <OrderItem key={orderID} id={orderID}/>
        )}
        {completedOrderKey.reverse().map(orderID => 
          <OrderItem key={orderID} id={orderID}/>
        )}
      </ul>
      <div className={styles.endBlock}></div>
    </div>
  )
}

