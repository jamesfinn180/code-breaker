import React from 'react'
import styles from './Modal.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'src/store'
import { Results } from '@components/Results'
import clsx from 'clsx'
import { resetGame, setShowModal } from '@slices/gameSlice'
import { AppDispatch } from '../../store'

export const ModalWinLoss: React.FC = () => {
  const { guesses, gameStatus } = useSelector((state: RootState) => state.game)
  const dispatch = useDispatch<AppDispatch>()
  const isWin = gameStatus === 'win'

  return (
    <>
      <h1>{isWin ? 'Congratulations!' : 'Hard Luck!'}</h1>
      <p>
        You {isWin ? 'succeeded' : 'failed'} after {guesses.length} attempts.
      </p>

      <Results />

      <div className={styles.Gap}></div>

      <div className={styles.BtnContainer}>
        <button
          className={clsx(styles.Button, styles.Button_pill)}
          onClick={() => alert('Not available yet. Coming soon.')}
        >
          Copy Results
        </button>
        <div className={styles.BtnContainer__Sub}>
          <button
            className={styles.Button}
            onClick={() => {
              dispatch(resetGame())
              dispatch(setShowModal(false))
            }}
          >
            Play Again
          </button>
        </div>
      </div>
    </>
  )
}
