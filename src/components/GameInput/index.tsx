import React from 'react'
import clsx from 'clsx'
import styles from './GameInput.module.scss'
import { colourConverter } from '@utils/utils'

interface IGameInput {
  value: string
}

export const GameInput: React.FC<IGameInput> = (props) => {
  const { value } = props
  const style = clsx(styles.Input, { [styles.Input_swell]: value !== '' })
  const colNum = value === '' ? 0 : parseInt(value)
  return (
    <input
      type="text"
      className={style}
      style={{ background: colourConverter(colNum).primary }}
      value={value}
      readOnly
    />
  )
}
