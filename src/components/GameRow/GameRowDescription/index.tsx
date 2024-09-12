import React from 'react'
import styles from './GameRowDescription.module.scss'
import { generateNumArray } from '@utils/utils'

export const GameRowDescription: React.FC = () => {
  return (
    <div className={styles.Container}>
      <div className={styles.DescrContainer}>
        <GameDescrDots colour="green" num={2} />
      </div>
      <div className={styles.DescrContainer}>
        <GameDescrDots colour="orange" num={1} />
      </div>
      <div className={styles.DescrContainer}>
        <GameDescrDots colour="red" num={2} />
      </div>
    </div>
  )
}

interface IGameDescrDots {
  colour: 'green' | 'orange' | 'red'
  num: number
}
const GameDescrDots: React.FC<IGameDescrDots> = (props) => {
  const { colour, num } = props
  return (
    <>
      {generateNumArray(num).map((i) => (
        <span
          key={i}
          className={[styles.Descr, styles[`Descr_${colour}`]].join(' ')}
        ></span>
      ))}
    </>
  )
}
