import React, { ReactNode } from 'react'
import styles from './Modal.module.scss'

interface IModal {
  children: ReactNode
}
export const Modal: React.FC<IModal> = ({ children }) => {
  return (
    <div className={styles.Background}>
      <div className={styles.Modal}>{children}</div>
    </div>
  )
}
