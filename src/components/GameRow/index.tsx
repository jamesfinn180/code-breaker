import React from 'react'
import styles from './GameRow.module.scss'
import { GameInput } from '@components/GameInput'
import { generateNumArray } from '@utils/utils'
import { GAME_NUM_CODE } from '@consts/game'
import { GameRowDescription } from './GameRowDescription'

export const GameRow: React.FC = () => {
  return (
    <div className={styles.Row}>
      {generateNumArray(GAME_NUM_CODE).map((i) => (
        <GameInput key={i} />
      ))}
      <GameRowDescription />
    </div>
  )
}
