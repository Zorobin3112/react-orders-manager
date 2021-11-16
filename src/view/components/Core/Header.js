import React from 'react'
import clsx from 'clsx'
import styles from './styles/Header.module.css'

export default function Header({  leftContent, centerContent, rightContent,
                                  backgroundColor = '', 
                                  titleLeftAlign = false,
                                  positionFixed = false}) {
    
    return (
        <div 
          className={clsx(styles.container, {
            [styles.blueBackground]: backgroundColor === 'blue',
            [styles.greenBackground]: backgroundColor === 'green',
            [styles.positionFixed]: positionFixed
          })}
        >
          <div className={styles.leftSection}>
            {leftContent}
          </div>
          <div 
            className={clsx(styles.centerSection, {
              [styles.leftAlign]: titleLeftAlign
            })}
          >
            {centerContent}
          </div>
          <div className={styles.rightSection}>
            {rightContent}
          </div>
        </div>
  )
}
