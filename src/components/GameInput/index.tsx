import React from 'react'
import styles from './GameInput.module.scss'

export const GameInput: React.FC = () => {
  return <input type="text" className={styles.Input} value={2} />
}
