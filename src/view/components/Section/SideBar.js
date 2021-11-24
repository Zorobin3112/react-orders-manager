import React from 'react'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import styles from './styles/SideBar.module.css'

export default function SideBar({onClickBar}) {
  const filterKey = 'all'
  return (
    <div className={styles.container}>
      <p className={styles.title}>Tính toán</p>
      <div 
        className={clsx(styles.row, {
          [styles.select]: filterKey === 'complete'
        })}
        onClick={onClickBar}
      > 
        <Link className={styles.link} to={'/report'}>Tổng doanh thu</Link>
      </div>

      <p className={styles.title}>Dữ liệu</p>
      <div 
        className={clsx(styles.row, {
          [styles.select]: filterKey === 'complete'
        })}
        onClick={onClickBar}
      > 
        <Link className={styles.link} to={'/json'}>Dữ liệu JSON</Link>
      </div>

      <div
        className={styles.footer}
      >Viết bởi Nguyễn Văn Khánh</div>
    </div>
  )
}
