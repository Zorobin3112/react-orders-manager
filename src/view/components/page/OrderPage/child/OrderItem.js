import React from 'react'
import styles from './styles/OrderItem.module.css'
import { useMyStore } from '$my-redux/hooks'

import OrderTitle from './OrderTitle'
import OrderInfo from './OrderInfo'
import { Prod } from '$components/section'

export default function OrderItem({id}) {
  const {orders, prods} = useMyStore()
  const order = orders[id]

  return (
    <li className={styles.container}>
      <OrderTitle id={id}/>
      <OrderInfo id={id}/>
      {order.stats.expanding&&
        order.prodIDs.map(prodID => 
          <Prod 
            key={prodID}
            id={prodID}
            path='/order'
            packageStatus={prods[prodID].parents.packageID !== ''}
          />
        )
      }
    </li>
  )
}
