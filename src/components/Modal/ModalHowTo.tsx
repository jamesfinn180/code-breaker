import React from 'react'
import styles from './Modal.module.scss'
import stylesR from '../Results/Results.module.scss'
import stylesI from '../GameInput/GameInput.module.scss'
import { GAME_NUM_CODE, GAME_GUESSES } from '@consts/game'
import clsx from 'clsx'
import { setShowModal } from '@slices/gameSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store'
import { colourConverter } from '@utils/utils'

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

      <p className={styles.Para}>
        To help plan your next move, you can click a previous guess once to mark
        it green, twice to mark it orange and three times to mark it red.
      </p>

      <div className={styles.MarkExample}>
        <div
          style={{ background: colourConverter(1).primary }}
          className={clsx(stylesI.Input, styles.InputExtra)}
        >
          1
          <span
            style={{ background: '#03b803' }}
            className={stylesI.Marker}
          ></span>
        </div>
        <div
          style={{ background: colourConverter(2).primary }}
          className={clsx(stylesI.Input, styles.InputExtra)}
        >
          2
          <span
            style={{ background: 'orange' }}
            className={stylesI.Marker}
          ></span>
        </div>
        <div
          style={{ background: colourConverter(3).primary }}
          className={clsx(stylesI.Input, styles.InputExtra)}
        >
          3
          <span
            style={{ background: '#fc2a2a' }}
            className={stylesI.Marker}
          ></span>
        </div>
      </div>

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
