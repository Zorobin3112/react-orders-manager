import React from 'react'
import styles from './styles/Order.module.css'
import OrderTitle from './OrderTitle.js'
import OrderInfo from './OrderInfo.js'
import Prod from './Prod.js'

export default function Order({contentData, orderIndex}) {
    
    return (
      <li className={styles.container}>
        <OrderTitle 
          customerName={contentData.displayData.customerName}
          stats={contentData.stats}
          orderIndex={orderIndex}
          prodNumber={contentData.prods.length}
        />
        <OrderInfo 
          totalPrice={10000}
          note={contentData.displayData.note}
          creatingDate={contentData.displayData.creatingDate}
          completeDate={contentData.displayData.completeDate}
          editing={contentData.stats.editing}
          orderIndex={orderIndex}
        />
        { contentData.stats.expanding&& 
          contentData.prods.map((prod, index) => (
            <Prod 
              prodData={prod}
              editing={contentData.stats.editing}
              orderIndex={orderIndex}
              prodIndex={index}
              key={index}
            />
        ))}
      </li>
  )
}
