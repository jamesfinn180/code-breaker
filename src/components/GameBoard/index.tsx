import React from 'react'
import styles from './GameBoard.module.scss'
import { GameRow } from '@components/GameRow'
import { GAME_GUESSES } from '@consts/game'
import { generateNumArray } from '@utils/utils'

export const GameBoard: React.FC = () => {
  return (
    <div className={styles.Board}>
      {generateNumArray(GAME_GUESSES).map((i) => (
        <GameRow key={i} />
      ))}
    </div>
  )
}
