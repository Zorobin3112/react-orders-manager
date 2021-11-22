import React from 'react'
import { useMyStore } from '$my-redux/hooks'
import styles from './styles/PackageInfo.module.css'
import { TitleInput } from '$components/core'

export default function PackageInfo({id}) {
  const { packages, prods, dispatch } = useMyStore()
  const {info, stats, prodIDs} = packages[id]

  return (
    <div className={styles.container}>
      <TitleInput
        title='Ngày tạo'
        value={info.creatingDate}
        flex={1}
      />
      <div>
        <TitleInput
          title='Khối lượng (kg)'
          value={info.weight}
          flex={1}
          editing={stats.editing}
        />
        <TitleInput
          title='Giá chuyển (¥)'
          value={info.price}
          flex={1}
          editing={stats.editing}
        />
      </div>
      <TitleInput
          title='Ghi chú'
          value={info.note}
          flex={1}
      />
    </div>
  )
}
