import React from 'react'
import styles from './styles/Footer.module.css'

export default function Footer({children}) {
    return (
      <>
        <div className={styles.container}>
          {children}
        </div>
        <div className={styles.endBlock2}></div>
      </>
  )
}
