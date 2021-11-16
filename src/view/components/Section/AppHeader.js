import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from './styles/AppHeader.module.css'
import { createOrder } from '../../../redux/orderSlice'
import { icon_menu, icon_orderAdd } from '../../assets/icon'
import { Header, IconButton } from '../Core'
import SideBar from './SideBar.js'

export default function AppHeader() {
  const dispatch = useDispatch()
  const [sideBarShow, setSideBarShow] = useState(false)
  return (
    <>
      <Header
        leftContent={
          <IconButton
            src={icon_menu}
            onClick={() => setSideBarShow(prev => !prev)}
          />
        }
        centerContent={
          <p className={styles.title}>QUẢN LÝ ĐẶT HÀNG</p>
        }
        rightContent={
          <IconButton
            src={icon_orderAdd}
            onClick={() => dispatch(createOrder())}
          />
        }
        positionFixed
      />
      {sideBarShow&&
        <SideBar 
          onClickBar={() => {
            console.log('AA')
            setSideBarShow(false)
          }}
        />
      }
    </>
  )
}
