import React from 'react'
import { useMyStore } from '$my-redux/hooks'
import { Link } from "react-router-dom"
import {  addPackage,
          toggleSelectAllItem,
          toggleExpandAllItem,
          toggleEditingMode,
          copyProdCode,
          deleteHandleForPackage } from '$my-redux/slice'
import styles from './styles/PackagePage.module.css'
import { Header, Footer } from '$components/section'
import { IconButton } from '$components/core'
import PackageItem from './child/PackageItem'
import {  icon_menu, 
          icon_selectAll,
          icon_expandAll,
          icon_packageAdd,
          icon_copy,
          icon_edit,
          icon_delete } from '$assets/icon'

export default function PackagePage() {
  const {packages, prods, packagePageStats, dispatch} = useMyStore()
  const footerContent = [
    {
      src: icon_selectAll,
      backgroundColor: packagePageStats.selectingIDs.length !== 0? 'blue': '',
      handleClick: () => dispatch(toggleSelectAllItem('packagePage'))
    },
    {
      src: icon_expandAll,
      backgroundColor: packagePageStats.expandingIDs.length !== 0? 'blue': '',
      handleClick: () => dispatch(toggleExpandAllItem('packagePage'))
    },
    {
      src: icon_copy,
      handleClick: () => dispatch(copyProdCode())
    },
    {
      src: icon_edit,
      backgroundColor: packagePageStats.editingIDs.length !== 0? 'blue': '',
      handleClick: () => dispatch(toggleEditingMode('packagePage'))
    },
    {
      src: icon_delete,
      backgroundColor: '',
      handleClick: () => dispatch(deleteHandleForPackage())
    }
  ]
  console.log('Packages: ', packages);
  console.log('Prods: ', prods);
  console.log('PackagePageStats: ', packagePageStats);
  console.log('Package Page Render')

  return (
    <div className={styles.container}>
      <Header
        leftContent={
          <IconButton
            src={icon_menu}
            onClick={() => {}}
          />
        }
        centerContent={
          <Link 
            className={styles.title}
            to='/'
          >
            QUẢN LÝ CHUYỂN HÀNG
          </Link>
        }
        rightContent={
          <IconButton
            src={icon_packageAdd}
            onClick={() => dispatch(addPackage())}
          />
        }
        positionFixed
      />

      <ul className={styles.itemList}>
        {Object.keys(packages).reverse().map(packageID => 
          <PackageItem key={packageID} id={packageID}/>
        )}
      </ul>
      <div className={styles.endBlock}></div>

      <Footer>
        {footerContent.map(({src, backgroundColor, handleClick}, index) => 
          <IconButton
            key={index}
            src={src}
            backgroundColor={backgroundColor}
            onClick={handleClick}
          />
        )}
      </Footer>
      
    </div>
  )
}

