import React from 'react'
import { useMyStore } from '$my-redux/hooks'
import {  changeItemInfo,
          toggleSelectItem,
          toggleCompletedItem,
          addProd,
          toggleExpandingItem } from '$my-redux/slice'
import clsx from 'clsx'
import styles from './styles/OrderTitle.module.css'
import {  icon_unselect, 
          icon_select, 
          icon_selectAll, 
          icon_expand, 
          icon_collapse, 
          icon_prodAdd,
          icon_mail } from '$assets/icon'
import { IconButton } from '$components/core'
import { Header } from '$components/section'

export default function OrderTitle({id}) { 
  const { orders, dispatch } = useMyStore()
  const {
    stats: {selecting, expanding, editing, completed, reported}, 
    info: {customerName}, 
    prodIDs 
  } = orders[id]

  return (
    <Header
      leftContent={
        <IconButton
          src={selecting.length === 0? icon_unselect: (
            selecting.length === prodIDs.length? icon_selectAll: icon_select
          )}
          onClick={() => dispatch(toggleSelectItem(['/order', id]))}
        />
      }
      centerContent={
        <input 
          className={clsx(styles.customerName, {
            [styles.editing]: editing
          })}
          value={customerName}
          disabled={!editing}
          onChange={e => dispatch(changeItemInfo(['/order', id, 'customerName', e.target.value]))}
        />
      }
      rightContent={<>
        {!reported&&
          <>
            {!completed&&
              <IconButton
                src={icon_prodAdd}
                onClick={() => dispatch(addProd(id))}
              />
            }
            <IconButton
              src={icon_mail}
              onClick={() => dispatch(toggleCompletedItem(['/order', id]))}
            />
          </>
        }
        <IconButton
          src={expanding? icon_collapse: icon_expand}
          onClick={() => dispatch(toggleExpandingItem(['/order', id]))}
        />
      </>}
      blueBackground
      completed={completed}
      reported={reported}
      titleLeftAlign
    />
  )
}
