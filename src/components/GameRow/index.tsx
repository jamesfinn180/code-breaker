import React from 'react'
import styles from './GameRow.module.scss'
import { GameInput } from '@components/GameInput'
import { generateNumArray } from '@utils/utils'
import { GAME_NUM_CODE } from '@consts/game'
import {
  GameRowDescription,
  GameRowFiller,
  GameRowPointer,
} from './GameRowDescription'

interface IGameRow {
  isCompletedRow: boolean
  isActiveRow: boolean
  rowGuesses: string[]
}

export const GameRow: React.FC<IGameRow> = (props) => {
  const { isActiveRow, isCompletedRow, rowGuesses } = props

  return (
    <div className={styles.Row}>
      {isActiveRow ? <GameRowPointer /> : <GameRowFiller />}
      {generateNumArray(GAME_NUM_CODE).map((num, i) => (
        <GameInput key={num} value={rowGuesses[i] || ''} pos={i} />
      ))}
      {isCompletedRow ? (
        <GameRowDescription rowGuesses={rowGuesses} />
      ) : (
        <GameRowFiller />
      )}
    </div>
  )
}
