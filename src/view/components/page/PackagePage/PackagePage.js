import React from 'react'
import { useMyStore } from '$my-redux/hooks'
import styles from './styles/PackagePage.module.css'
import PackageItem from './child/PackageItem'

export default function PackagePage() {
  const { activePackageKey,
          completedPackageKey } = useMyStore()

  return (
    <div className={styles.container}>
      <ul className={styles.itemList}>
        {activePackageKey.reverse().map(packageID => 
          <PackageItem key={packageID} id={packageID}/>
        )}
        {completedPackageKey.reverse().map(packageID => 
          <PackageItem key={packageID} id={packageID}/>
        )}
      </ul>
      <div className={styles.endBlock}></div>
    </div>
  )
}

