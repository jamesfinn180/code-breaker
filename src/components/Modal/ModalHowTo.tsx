import React from 'react'
import styles from './Modal.module.scss'
import stylesR from '../Results/Results.module.scss'
import { GAME_NUM_CODE, GAME_GUESSES } from '@consts/game'
import clsx from 'clsx'
import { setShowModal } from '@slices/gameSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store'

export const ModalHowTo: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  return (
    <>
      <h1>
        How to Play
        <br />
        Code Breaker
      </h1>
      <p>
        Break the {GAME_NUM_CODE}-digit code, where each digit is unique, within{' '}
        {GAME_GUESSES} guesses. Use the feedback from each guess to help you
        solve the code.
      </p>
      <p className={styles.Para}>
        <span className={clsx(stylesR.Result, stylesR.Result_green)}></span> one
        correct digit, in correct spot
      </p>
      <p className={styles.Para}>
        <span className={clsx(stylesR.Result, stylesR.Result_orange)}></span>{' '}
        one correct digit, <strong>not</strong> in the correct spot
      </p>
      <p className={styles.Para}>
        <span className={clsx(stylesR.Result, stylesR.Result_red)}></span> one
        digit <strong>is not in</strong> the code
      </p>

      <div className={styles.Gap}></div>

      <div className={styles.BtnContainer}>
        <button
          className={styles.Button}
          onClick={() => dispatch(setShowModal(false))}
        >
          Close
        </button>
      </div>
    </>
  )
}
