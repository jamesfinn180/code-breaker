import React from 'react'
import styles from './GameRowPointer.module.scss'

export const GameRowPointer: React.FC = () => {
  return (
    <div className={styles.Container}>
      <span className={styles.Pointer}>&#9654;</span>
    </div>
  )
}
