import React, { useEffect } from 'react'
import styles from './App.module.scss'
import { GameBoard } from '@components/GameBoard/'
import { Keyboard } from '@components/Keyboard'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from './store'
import {
  resetGame,
  setGuessKey,
  submitGuessAndCheckStatus,
  removeGuessKey,
  setShowModal,
} from '@slices/gameSlice'
import { PERMITTED_KEYS_PRESSED } from '@utils/utils'
import { Modal } from '@components/Modal'
import { ModalWinLoss } from '@components/Modal/ModalWinLoss'
import { ModalHowTo } from '@components/Modal/ModalHowTo'

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { code, gameStatus, showModal, winsAndLosses } = useSelector(
    (state: RootState) => state.game
  )

  useEffect(() => {
    dispatch(resetGame())

    const handleKeyDown = (e: KeyboardEvent) => {
      const keyPressed = e.key.toLowerCase()
      if (PERMITTED_KEYS_PRESSED.includes(keyPressed)) {
        if (keyPressed === 'enter') {
          dispatch(submitGuessAndCheckStatus())
        } else if (keyPressed === 'backspace') {
          dispatch(removeGuessKey())
        } else {
          dispatch(setGuessKey(keyPressed))
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  useEffect(() => {
    console.log(code)
    console.log(gameStatus)
  }, [code, gameStatus])

  return (
    <div className={styles.App}>
      <div className={styles.Container}>
        <div>
          <header className={styles.Header}>
            <span className={styles.Header__WL}>
              {winsAndLosses.wins}/{winsAndLosses.losses}
            </span>
            <p>Code Breaker</p>
            <button
              className={styles.HowTo}
              onClick={() => {
                dispatch(setShowModal(true))
              }}
            >
              ?
            </button>
          </header>
          <GameBoard />
        </div>

        <Keyboard />
        {showModal && (
          <Modal>
            {gameStatus === 'active' ? <ModalHowTo /> : <ModalWinLoss />}
          </Modal>
        )}
      </div>
    </div>
  )
}

export default App
