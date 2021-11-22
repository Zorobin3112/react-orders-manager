import React from 'react'
import styles from './styles/OrderItem.module.css'
import { useMyStore } from '$my-redux/hooks'

import OrderTitle from './OrderTitle'
import OrderInfo from './OrderInfo'
import { Prod } from '$components/section'

export default function Order({id}) {
  const {orders, prods} = useMyStore()
  const order = orders[id]

  return (
    <li className={styles.container}>
      <OrderTitle id={id}/>
      <OrderInfo id={id}/>
      {order.stats.expanding&&
        order.prodIDs.map(prodID => 
          <>
            <Prod 
              key={prodID}
              id={prodID}
              page={'order'}
            />
            {prods[prodID].parents.packageID !== ''&&
              <div className={styles.prodStatus}>
                {`Sản phẩm đã được thêm vào chuyến hàng ${prods[prodID].parents.packageID}`}
              </div>
            }
          </>
        )
      }
    </li>
  )
}