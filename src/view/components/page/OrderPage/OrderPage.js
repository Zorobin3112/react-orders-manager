import React from 'react'
import { useMyStore } from '$my-redux/hooks'
import { Link } from "react-router-dom"
import {  addOrder, 
          toggleSelectAllItem,
          toggleExpandAllItem,
          toggleEditingMode,
          copySelectingProd,
          deleteHandleForOrder } from '$my-redux/slice'
import styles from './styles/OrderPage.module.css'
import { Header, Footer } from '$components/section'
import { IconButton } from '$components/core'
import OrderItem from './child/OrderItem'
import {  icon_menu, 
          icon_orderAdd,
          icon_selectAll,
          icon_expandAll,
          icon_copy,
          icon_edit,
          icon_delete } from '$assets/icon'

export default function OrderPage() {
  const {orders, prods, prodClipboard, orderPageStats, dispatch} = useMyStore()
  
  const footerContent = [
    {
      src: icon_selectAll,
      backgroundColor: orderPageStats.selectingIDs.length !== 0? 'blue': '',
      handleClick: () => dispatch(toggleSelectAllItem('orderPage'))
    },
    {
      src: icon_expandAll,
      backgroundColor: orderPageStats.expandingIDs.length !== 0? 'blue': '',
      handleClick: () => dispatch(toggleExpandAllItem('orderPage'))
    },
    {
      src: icon_copy,
      backgroundColor: prodClipboard.length !== 0? 'blue': '',
      handleClick: () => dispatch(copySelectingProd())
    },
    {
      src: icon_edit,
      backgroundColor: orderPageStats.editingIDs.length !== 0? 'blue': '',
      handleClick: () => dispatch(toggleEditingMode('orderPage'))
    },
    {
      src: icon_delete,
      backgroundColor: '',
      handleClick: () => dispatch(deleteHandleForOrder())
    }
  ]
  console.log('Orders: ', orders);
  console.log('Prods: ', prods);
  console.log('OrderPageStats: ', orderPageStats);
  console.log('Order Page Render')

  return (
    <div className={styles.container}>
      <Header
        leftContent={
          <IconButton
            src={icon_menu}
            onClick={() => {}}
          />
        }
        centerContent={
          <Link 
            className={styles.title}
            to='package'
          >
            QUẢN LÝ ĐƠN HÀNG
          </Link>
        }
        rightContent={
          <IconButton
            src={icon_orderAdd}
            onClick={() => dispatch(addOrder())}
          />
        }
        positionFixed
      />

      <ul className={styles.orderList}>
        {Object.keys(orders).reverse().map(orderID => 
          <OrderItem key={orderID} id={orderID}/>
        )}
      </ul>
      <div className={styles.endBlock}></div>

      <Footer>
        {footerContent.map(({src, backgroundColor, handleClick}, index) => 
          <IconButton
            key={index}
            src={src}
            backgroundColor={backgroundColor}
            onClick={handleClick}
          />
        )}
      </Footer>
      
    </div>
  )
}

