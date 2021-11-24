import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './styles/JsonPage.module.css'
import { useMyStore } from '$my-redux/hooks'
import { loadData } from '$my-redux/slice'
import copy from 'copy-to-clipboard'

export default function JsonPage() {
  const {myStore, dispatch} = useMyStore()
  const myStoreinJSON = JSON.stringify(myStore)
  const [jsonData, setJsonData] = useState(myStoreinJSON)

  return (
      <div className={styles.container}>
        <div className={styles.contentSection}>
          <textarea
            value={jsonData}
            onChange={e => setJsonData(e.target.value)}
          />
        </div>
        <div className={styles.buttonSection}>
          <div 
            className={styles.button}
            onClick={() => setJsonData(prev => '')}
          >
            <p>Reset</p>
          </div>
          <div 
            className={styles.button}
            onClick={() => {
              dispatch(loadData(JSON.parse(jsonData)))
            }}
          >
            <p>Set JSON</p>
          </div>
          <div
            className={styles.button}
            onClick={() => {
              copy(myStoreinJSON)
              setJsonData(prev => myStoreinJSON)
            }}
          >
            <p>Get and Copy JSON</p>
          </div>
          <Link
            className={styles.button}
            to={'/order'}
          >
            <p>Thoát</p>
          </Link>
        </div>
      </div>
  )
}
