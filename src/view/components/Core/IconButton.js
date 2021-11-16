import React from 'react'
import clsx from 'clsx'
import styles from './styles/IconButton.module.css'

export default function IconButton({src, backgroundColor, onClick}) {
    return (
        <div 
          className={clsx(styles.container,{
            [styles.blueBackground]: backgroundColor === 'blue'
          })}
          onClick={onClick}
        >
          <img src={src} alt='icon'/>
        </div>
  )
}
