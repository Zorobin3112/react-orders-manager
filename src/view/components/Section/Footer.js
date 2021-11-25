import React, { useState } from 'react'
import { useMyStore } from '$my-redux/hooks'
import {  toggleSelectAllItem,
          toggleExpandAllItem,
          copyProdCode, 
          copySelectingProd, 
          toggleEditingMode,
          deleteHandleForOrder,
          deleteHandleForPackage,
          resetSelectingStats  } from '$my-redux/slice'
import styles from './styles/Footer.module.css'
import {  icon_selectAll,
          icon_expandAll,
          icon_copy,
          icon_edit,
          icon_delete,
          icon_report } from '$assets/icon'
import { IconButton, TitleInput } from '$components/core'

export default function Footer({path}) {
  const { dispatch, orders, prods, orderPageStats, packagePageStats, prodClipboard } = useMyStore()
  const pageStats = path === '/order'? orderPageStats: packagePageStats
  const footerContent = [
    {
      src: icon_selectAll,
      backgroundColor: pageStats.selectingIDs.length !== 0? 'blue': '',
      handleClick: () => dispatch(toggleSelectAllItem(path))
    },
    {
      src: icon_expandAll,
      backgroundColor: pageStats.expandingIDs.length !== 0? 'blue': '',
      handleClick: () => dispatch(toggleExpandAllItem(path))
    },
    {
      src: icon_copy,
      backgroundColor: prodClipboard.length !== 0? 'blue': '',
      handleClick: path === '/order'?
        () => dispatch(copySelectingProd()): () => dispatch(copyProdCode())
    },
    {
      src: icon_edit,
      backgroundColor: pageStats.editingIDs.length !== 0? 'blue': '',
      handleClick: () => dispatch(toggleEditingMode(path))
    },
    {
      src: icon_delete,
      backgroundColor: '',
      handleClick: path === '/order'?
      () => dispatch(deleteHandleForOrder()): () => dispatch(deleteHandleForPackage())
    }
  ]  

  const [subReport, setSubReport] = useState({buyTotalPrice: 0, sellTotalPrice: 0})
  const subReportShow = (subReport.buyTotalPrice !== 0|| subReport.sellTotalPrice !== 0)
  if(pageStats.selectingIDs.length !== 0) {
    subReport.buyTotalPrice = 0
    subReport.sellTotalPrice = 0
  }
  const subReportHandle = () => {
    if(subReportShow) {
      setSubReport(prev => ({buyTotalPrice: 0, sellTotalPrice: 0}))
    }
    else if(orderPageStats.selectingIDs.length !== 0) {
      setSubReport(prev => {
        const total = orderPageStats.selectingIDs.reduce((total, orderID) => {
          const order = orders[orderID]
          const prodTotalPrice = order.stats.selecting.reduce((prodTotal, prodID) => {
            const prod = prods[prodID]
            return {
              buyTotalPrice: prodTotal.buyTotalPrice + prod.info.buyPrice,
              sellTotalPrice: prodTotal.sellTotalPrice + prod.info.sellPrice
            }
          }, {buyTotalPrice: 0, sellTotalPrice: 0})
          return {
            buyTotalPrice: total.buyTotalPrice + prodTotalPrice.buyTotalPrice,
            sellTotalPrice: total.sellTotalPrice + prodTotalPrice.sellTotalPrice
          }
        }, {buyTotalPrice: 0, sellTotalPrice: 0})
        return total
      })
      dispatch(resetSelectingStats('/order'))
    }
  }
  return (
    <>
      <div className={styles.container}>
        {path === '/order'&& 
          (subReportShow||orderPageStats.selectingIDs.length !== 0)&&
          <div className={styles.row}>
            {subReportShow&&
              <>
                <TitleInput
                  title='Tổng tiền mua (¥)'
                  value={subReport.buyTotalPrice}
                  flex={1}
                />
                <TitleInput
                  title='Tổng tiền bán (¥)'
                  value={subReport.sellTotalPrice}
                  flex={1}
                />
              </>
            }
            <IconButton
              src={icon_report}
              backgroundColor={subReportShow? 'blue': ''}
              onClick={subReportHandle}
            />
          </div>
        }
        <div className={styles.row}>
          {footerContent.map(({src, backgroundColor, handleClick}, index) => 
            <IconButton
              key={index}
              src={src}
              backgroundColor={backgroundColor}
              onClick={handleClick}
            />
          )}   
        </div>
      </div>
      <div className={styles.endBlock2}></div>
    </>
  )
}
