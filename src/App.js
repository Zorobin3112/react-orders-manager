import React, { useState, useMemo, useEffect } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { useMyStore } from '$my-redux/hooks'
import { storeData, getData } from '$my-redux/storage'
import {  loadData,
          addOrder,
          addPackage } from '$my-redux/slice'
import './App.css'
import { OrderPage, PackagePage, Report, JsonPage } from '$components/page'
import { Header, Footer, SideBar } from '$components/section'
import { IconButton } from '$components/core'
import {  icon_orderAdd, 
          icon_packageAdd,
          icon_menu } from '$assets/icon'

function App() {
  const {myStore, dispatch} = useMyStore()
  const location = useLocation()
  const [sideBarShow, setSideBarShow] = useState(false)
  
  if(location.pathname === '/') location.pathname = '/order'
  const pageName = {
    "/order": 'QUẢN LÝ ĐƠN HÀNG',
    "/package": 'QUẢN LÝ CHUYỂN HÀNG',
    "/report": 'BÁO CÁO DOANH THU',
    "/json": 'DỮ LIỆU JSON'
  }

  //Load/Save Data
  useMemo(() => {
    const loadedData = getData()
    if(loadedData) {
      dispatch(loadData(loadedData))
    }
    console.log('Load');
  }, [dispatch])

  useEffect(() => {
    storeData(myStore)
    console.log('Saved');
  }, [myStore])

  return (
    <div className="App">
      <Header
        leftContent={location.pathname !== '/report'&&location.pathname !== '/json'&&
          <IconButton
            src={icon_menu}
            onClick={() => setSideBarShow(prev => !prev)}
          />
        }
        centerContent={
          <Link 
            className='headerTitle'
            to={location.pathname === '/order'? '/package': '/order'}
          >
            {pageName[location.pathname]}
          </Link>
        }
        rightContent={location.pathname === '/order'?
          <IconButton
            src={icon_orderAdd}
            onClick={() => dispatch(addOrder())}
          />:　
          location.pathname !== '/report'&&location.pathname !== '/json'&&
          <IconButton
            src={icon_packageAdd}
            onClick={() => dispatch(addPackage())}
          />
        }
        positionFixed
      />
      {sideBarShow&&
        <SideBar 
          onClickBar={() => setSideBarShow(false)}
        />
      }

      <Routes>
        <Route path='/' element={<OrderPage />}/>
        <Route path='/order' element={<OrderPage />}/>
        <Route path='/package' element={<PackagePage />}/>
        <Route path='/report' element={<Report />}/>
        <Route path='/json' element={<JsonPage />}/>
      </Routes>

      {location.pathname !== '/report'&& location.pathname !== '/json'&&
        <Footer path={location.pathname}/>
      }
    </div>
  )
}

export default App
