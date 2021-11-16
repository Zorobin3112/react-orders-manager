import React from 'react'
import { useDispatch } from 'react-redux'
import {  toggleSelectAllOrder,
          toggleExpandAllOrder,
          toggleEditingMode,
          deleteSelectedItem,
          copyToClipboardPostCode } from '../../../redux/orderSlice'
import styles from './styles/Footer.module.css'
import {  icon_expand, 
          icon_collapse, 
          icon_selectAll, 
          icon_edit,
          icon_delete,
          icon_copy } from '../../assets/icon'
import { IconButton } from '../Core'

export default function Footer({appStats}) {
    const dispatch = useDispatch()
    return (
        <div className={styles.container}>
          <IconButton 
            src={icon_selectAll}
            backgroundColor={appStats.select.length !== 0? 'blue': null}
            onClick={() => dispatch(toggleSelectAllOrder())}
          />
          <IconButton 
            src={appStats.expanding.length !== 0? icon_collapse: icon_expand}
            backgroundColor={appStats.expanding.length !== 0? 'blue': null}
            onClick={() => dispatch(toggleExpandAllOrder())}
          />
          <IconButton 
            src={icon_copy}
            onClick={() => dispatch(copyToClipboardPostCode())}
          />
          <IconButton 
            src={icon_edit}
            backgroundColor={appStats.editing.length !== 0? 'blue': null}
            onClick={() => dispatch(toggleEditingMode())}
          />
          <IconButton 
            src={icon_delete}
            onClick={() => dispatch(deleteSelectedItem())}
          />
        </div>
  )
}
