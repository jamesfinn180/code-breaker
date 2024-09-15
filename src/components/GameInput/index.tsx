import React from 'react'
import clsx from 'clsx'
import styles from './GameInput.module.scss'

interface IGameInput {
  value: string
}

export const GameInput: React.FC<IGameInput> = (props) => {
  const { value } = props
  const style = clsx(styles.Input, { [styles.Input_swell]: value !== '' })
  return <input type="text" className={style} value={value} readOnly />
}
