import React from 'react'
import { useDispatch } from 'react-redux'
import {  toggleSelectAllProd,
          createProd,
          toggleExpandOrder,
          toggleComplete,
          setOrderData  } from '../../../redux/orderSlice'
import clsx from 'clsx'
import styles from './styles/OrderTitle.module.css'
import {  icon_unselect, 
          icon_select, 
          icon_selectAll, 
          icon_expand, 
          icon_collapse, 
          icon_prodAdd,
          icon_mail } from '../../assets/icon'
import { Header, IconButton } from '../Core'

export default function OrderTitle({customerName, stats, orderIndex, prodNumber}) { 
  const dispatch = useDispatch()
  return (
    <Header
      leftContent={
        <IconButton
          src={stats.select.length === 0? icon_unselect: (
            stats.select.length === prodNumber? icon_selectAll: icon_select
          )}
          onClick={() => dispatch(toggleSelectAllProd([orderIndex]))}
        />
      }
      centerContent={
        <input 
          className={clsx(styles.customerName, {
            [styles.editing]: stats.editing
          })}
          value={customerName}
          disabled={!stats.editing}
          onChange={e => 
            dispatch(setOrderData([orderIndex, 'customerName', e.target.value]))}
        />
      }
      rightContent={<>
        <IconButton
          src={icon_mail}
          onClick={() => dispatch(toggleComplete([orderIndex]))}
        />
        <IconButton
          src={icon_prodAdd}
          onClick={() => dispatch(createProd([orderIndex]))}
        />
        <IconButton
          src={stats.expanding? icon_collapse: icon_expand}
          onClick={() => dispatch(toggleExpandOrder([orderIndex]))}
        />
      </>}
      backgroundColor={stats.complete?'green': 'blue'}
      titleLeftAlign
    />
  )
}
