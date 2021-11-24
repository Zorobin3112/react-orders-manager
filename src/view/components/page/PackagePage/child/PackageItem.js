import React from 'react'
import { useMyStore } from '$my-redux/hooks'
import { pasteProdToPackage } from '$my-redux/slice'
import styles from './styles/PackageItem.module.css'

import PackageTitle from './PackageTitle'
import PackageInfo from './PackageInfo'
import { Prod } from '$components/section'

export default function PackageItem({id}) {
  const {packages, prodClipboard, dispatch} = useMyStore()
  const pack = packages[id]
  
  return (
    <li className={styles.container}>
      <PackageTitle id={id}/>
      <PackageInfo id={id}/>
      {prodClipboard.length !== 0&&
        <button 
          className={styles.pasteButton}
          onClick={() => dispatch(pasteProdToPackage(id))}
        >
          Dán sản phẩm vào chuyến hàng
        </button>
      }
      {pack.stats.expanding&&
        pack.prodIDs.map(prodID => 
          <Prod 
            key={prodID}
            id={prodID}
            forceUneditable
            path='/package'
          />
        )
      }
    </li>
  )
}