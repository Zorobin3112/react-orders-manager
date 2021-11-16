import React from 'react'
import clsx from 'clsx'
import styles from './styles/TitleInput.module.css'

export default function TitleInput({title, value, editing = false, flex, width, onChange}) {
    
    return (
        <div 
          style={{ flex, width }} 
          className={styles.container}
        >
          <p>{title}</p>
          <input
            className={clsx(styles.input, {
              [styles.editing]: editing
            })}
            value={value}
            onChange={e => onChange(e.target.value)}
            disabled={!editing}
          />
        </div>
  )
}
