import React, { useState } from 'react'
import styles from './Modal.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'src/store'
import { Results } from '@components/Results'
import clsx from 'clsx'
import { resetGame, setShowModal } from '@slices/gameSlice'
import { AppDispatch } from '../../store'

export const ModalWinLoss: React.FC = () => {
  const { guesses, gameStatus, code } = useSelector(
    (state: RootState) => state.game
  )
  const [copyMessage, setCopyMessage] = useState('')
  const dispatch = useDispatch<AppDispatch>()
  const isWin = gameStatus === 'win'

  const copyResultsToClipboard = async () => {
    try {
      let copiedResults = 'Code Breaker\n'
      const codeStr = code.join('')
      for (let g = 0; g < guesses.length; g++) {
        copiedResults +=
          guesses[g]
            .map((guessNum, i) => {
              if (guessNum === codeStr[i]) {
                return '🟢'
              } else if (codeStr.includes(guessNum)) {
                return '🟠'
              } else {
                return '🔴'
              }
            })
            .join('') + '\n'
      }
      copiedResults += 'https://jamesfinn180.github.io/code-breaker/'
      await navigator.clipboard.writeText(copiedResults)
      setCopyMessage('Results copied to clipboard')
    } catch (err) {
      console.error('Failed to copy text: ', err)
      setCopyMessage('Failed to copy results!')
    }
  }

  return (
    <>
      <h1>{isWin ? 'Congratulations!' : 'Hard Luck!'}</h1>
      <p>
        You {isWin ? 'succeeded' : 'failed'} after {guesses.length} attempts.
      </p>

      <Results />

      <div className={styles.Gap}></div>

      <p>{copyMessage}</p>
      <div className={styles.BtnContainer}>
        <button
          className={clsx(styles.Button, styles.Button_pill)}
          onClick={copyResultsToClipboard}
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
