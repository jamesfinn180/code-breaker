import React from 'react'
import styles from './GameBoard.module.scss'
import { GameRow } from '@components/GameRow'
import { GAME_GUESSES } from '@consts/game'
import { generateNumArray } from '@utils/utils'
import { useSelector } from 'react-redux'
import { RootState } from 'src/store'

export const GameBoard: React.FC = () => {
  const { guesses } = useSelector((state: RootState) => state.game)

  return (
    <div className={styles.Board}>
      {generateNumArray(GAME_GUESSES).map((num, i) => (
        <GameRow
          key={`row-${num}`}
          isCompletedRow={!!guesses[i] && !!guesses[i + 1]}
          isActiveRow={!!guesses[i] && !guesses[i + 1]}
          // If there are no guesses pass empty string array
          rowGuesses={guesses[i] || ['', '', '', '']}
        />
      ))}
    </div>
  )
}
