import React from 'react'
import { useMyStore } from '$my-redux/hooks'
import {  toggleSelectItem,
          toggleCompletedItem,
          toggleExpandingItem } from '$my-redux/slice'
import styles from './styles/PackageTitle.module.css'
import {  icon_unselect, 
          icon_select, 
          icon_selectAll, 
          icon_expand, 
          icon_collapse, 
          icon_mail } from '$assets/icon'
import { IconButton } from '$components/core'
import { Header } from '$components/section'

export default function PackageTitle({id}) { 
  const { packages,packagePageStats , dispatch } = useMyStore()
  const {
    stats: {selecting, expanding, completed, reported}, 
    prodIDs 
  } = packages[id]
  
  return (
    <Header
      leftContent={
        <IconButton
          src={!packagePageStats.selectingIDs.includes(id)? icon_unselect: (
            selecting.length === prodIDs.length? icon_selectAll: icon_select
          )}
          onClick={() => dispatch(toggleSelectItem(['/package', id]))}
        />
      }
      centerContent={
        <p className={styles.packageID}>{id}</p>
      }
      rightContent={<>
        {!reported&&
          <IconButton
            src={icon_mail}
            onClick={() => dispatch(toggleCompletedItem(['/package', id]))}
          />
        }
        <IconButton
          src={expanding? icon_collapse: icon_expand}
          onClick={() => dispatch(toggleExpandingItem(['/package', id]))}
        />
      </>}
      blueBackground
      completed={completed}
      reported={reported}
      titleLeftAlign
    />
  )
}
