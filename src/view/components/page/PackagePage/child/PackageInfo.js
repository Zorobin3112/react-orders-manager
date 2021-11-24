import React from 'react'
import { useMyStore } from '$my-redux/hooks'
import { changeItemInfo } from '$my-redux/slice'
import styles from './styles/PackageInfo.module.css'
import { TitleInput } from '$components/core'

export default function PackageInfo({id}) {
  const { packages, dispatch} = useMyStore()
  const {info, stats} = packages[id]

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
          onChange={value => dispatch(changeItemInfo(['/package', id, 'weight', Number(value)]))}
        />
        <TitleInput
          title='Giá chuyển (¥)'
          value={info.price}
          flex={1}
          editing={stats.editing}
          onChange={value => dispatch(changeItemInfo(['/package', id, 'price', Number(value)]))}
        />
      </div>
      <TitleInput
          title='Ghi chú'
          value={info.note}
          flex={1}
          editing={stats.editing}
          onChange={value => dispatch(changeItemInfo(['/package', id, 'note', value]))}

      />
    </div>
  )
}
