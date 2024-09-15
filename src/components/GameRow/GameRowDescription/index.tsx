import React, { useEffect, useState } from 'react'
import styles from './GameRowDescription.module.scss'
import { generateNumArray } from '@utils/utils'
import { useSelector } from 'react-redux'
import { RootState } from 'src/store'
import { GAME_NUM_CODE } from '@consts/game'
import clsx from 'clsx'

interface IGameRowDescription {
  rowGuesses: string[]
}
export const GameRowDescription: React.FC<IGameRowDescription> = (props) => {
  const { rowGuesses } = props
  const { code } = useSelector((state: RootState) => state.game)
  const initialDots = { green: 0, orange: 0, red: 0 }
  const [dots, setDots] = useState({ ...initialDots })

  useEffect(() => {
    const d = { ...initialDots }
    rowGuesses.forEach((guess, i) => {
      if (guess === code[i].toString()) {
        d.green++
      }
      if (code.includes(parseInt(guess))) {
        d.orange++
      }
    })
    d.orange = d.orange - d.green
    d.red = GAME_NUM_CODE - d.orange - d.green
    setDots({ ...d })
  }, [rowGuesses])

  return (
    <div className={styles.Container}>
      <div className={styles.DescrContainer}>
        <GameDescrDots colour="green" num={dots.green} />
      </div>
      <div className={styles.DescrContainer}>
        <GameDescrDots colour="orange" num={dots.orange} />
      </div>
      <div className={styles.DescrContainer}>
        <GameDescrDots colour="red" num={dots.red} />
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

export const GameRowFiller: React.FC = () => {
  return <div className={styles.Container}></div>
}

export const GameRowPointer: React.FC = () => {
  const style = clsx(styles.Container, styles.Container_pointer)
  return (
    <div className={style}>
      <span className={styles.Pointer}>&#9654;</span>
    </div>
  )
}
