import React from 'react'
import styles from './styles/SubReport.module.css'
import { TitleInput } from '$components/core'

export default function SubReport() {
    
    return (
        <div className={styles.container}>
          <TitleInput
            title='Tổng tiền mua hàng (¥)'
            value={0}
          />
          <TitleInput
            title='Tổng tiền bán hàng (¥)'
            value={0}
            bigSize
          />
        </div>
  )
}
