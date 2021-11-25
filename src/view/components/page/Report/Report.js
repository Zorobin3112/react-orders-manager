import React, { useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import styles from './styles/Report.module.css'
import { useMyStore } from '$my-redux/hooks'
import {  updateReport, 
          resetReport,
          deleteReportedItem } from '$my-redux/slice'
import { TitleInput } from '$components/core'

export default function Report() {
  const {report: {
    resetDate,
    orderTotal,
    buyTotalPrice,
    sellTotalPrice,
    packageTotal,
    postTotalPrice
  }, dispatch} = useMyStore()
  
  let totalProfit = useRef(0)

  useMemo(() => {
    totalProfit.current = sellTotalPrice - buyTotalPrice - postTotalPrice
  }, [  buyTotalPrice,
        sellTotalPrice,
        postTotalPrice
  ])

  return (
      <div className={styles.container}>
        <div className={styles.contentSection}>
          <TitleInput
            title='Thời điểm reset báo cáo'
            value={resetDate}
            bigSize
          />
          <TitleInput
            title='Tổng số đơn đã chốt'
            value={orderTotal}
            bigSize
          />
          <TitleInput
            title='Tổng tiền mua hàng (¥)'
            value={buyTotalPrice}
            bigSize
          />
          <TitleInput
            title='Tổng tiền bán hàng (¥)'
            value={sellTotalPrice}
            bigSize
          />
          <TitleInput
            title='Tổng số chuyến hàng'
            value={packageTotal}
            bigSize
          />
          <TitleInput
            title='Tổng tiền vận chuyển (¥)'
            value={postTotalPrice}
            bigSize
          />
          <div className={styles.line}/>
          <TitleInput
            title='Tổng lợi nhuận (¥)'
            value={totalProfit.current}
            bigSize
          />
        </div>
        <div className={styles.buttonSection}>
          <div className={styles.column}>
            <div 
              className={styles.button}
              onClick={() => {
                if(window.confirm("Bạn có muốn xóa doanh thu"))
                  dispatch(resetReport())
              }}
            >
              <p>Reset doanh thu</p>
            </div>
            <div
              className={styles.button}
              onClick={() => {
                if(window.confirm("Bạn có muốn xóa dữ liệu"))
                  dispatch(deleteReportedItem())
              }}
            >
              <p>Xóa dữ liệu đã chốt</p>
            </div>
          </div>
          <div className={styles.column}>
            <div
              className={styles.button}
              onClick={() => dispatch(updateReport())}
            >
              <p>Cập nhật doanh thu</p>
            </div>
            
            <Link
              className={styles.button}
              to={'/order'}
            >
              <p>Thoát</p>
            </Link>
          </div>
        </div>
      </div>
  )
}
