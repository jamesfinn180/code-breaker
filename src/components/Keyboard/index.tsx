import React from 'react'
import styles from './Keyboard.module.scss'
import { GAME_KEYS } from '@consts/game'
import { generateNumArray } from '@utils/utils'

const splitKeys = (keysArr: number[]) => {
  const splitPoint = Math.ceil(keysArr.length / 2)
  return [[...keysArr.slice(0, splitPoint)], [...keysArr.slice(splitPoint)]]
}

export const Keyboard: React.FC = () => {
  const keys = generateNumArray(GAME_KEYS)
  const keysRows = splitKeys(keys)

  return (
    <section className={styles.Keyboard}>
      {keysRows.map((r, i) => (
        <div key={r[0]} className={styles.KeyRow}>
          {i === keysRows.length - 1 && (
            <button className={[styles.Key, styles.Key_game].join(' ')}>
              {'ENTER'}
            </button>
          )}
          {r.map((k) => {
            return <Key key={k} digit={k} />
          })}
          {i === keysRows.length - 1 && (
            <button className={[styles.Key, styles.Key_game].join(' ')}>
              {'<<<'}
            </button>
          )}
        </div>
      ))}
    </section>
  )
}

interface IKey {
  digit: number
}

const Key: React.FC<IKey> = (props) => {
  const { digit } = props

  return <button className={styles.Key}>{digit}</button>
}
