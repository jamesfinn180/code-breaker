import React, { useEffect, useState } from 'react'
import styles from './Keyboard.module.scss'
import { GAME_KEYS } from '@consts/game'
import { generateNumArray } from '@utils/utils'
import { AppDispatch, RootState } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import {
  setGuessKey,
  removeGuessKey,
  submitGuessAndCheckStatus,
} from '@slices/gameSlice'

const splitKeys = (keysArr: number[]) => {
  const splitPoint = Math.ceil(keysArr.length / 2)
  return [[...keysArr.slice(0, splitPoint)], [...keysArr.slice(splitPoint)]]
}

export const Keyboard: React.FC = () => {
  const { guesses } = useSelector((state: RootState) => state.game)
  const [currGuesses, setCurrGuesses] = useState<string[]>([])
  const dispatch = useDispatch<AppDispatch>()

  const keys = generateNumArray(GAME_KEYS)
  const keysRows = splitKeys(keys)

  const handleKeyClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const target = e.target as HTMLButtonElement
    const keyStroke = target.dataset.digit as string
    dispatch(setGuessKey(keyStroke))
  }

  const handleBackClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(removeGuessKey())
  }

  const handleEnterClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(submitGuessAndCheckStatus())
  }

  useEffect(() => {
    setCurrGuesses(guesses[guesses.length - 1])
  }, [guesses])

  return (
    <section className={styles.Keyboard}>
      {keysRows.map((r, i) => (
        <div key={r[0]} className={styles.KeyRow}>
          {i === keysRows.length - 1 && (
            <button
              className={[styles.Key, styles.Key_game].join(' ')}
              onClick={handleEnterClick}
            >
              {'ENTER'}
            </button>
          )}
          {r.map((k) => {
            return (
              <Key
                key={k}
                digit={k}
                disabled={currGuesses.includes(k.toString())}
                handleKeyClick={handleKeyClick}
              />
            )
          })}
          {i === keysRows.length - 1 && (
            <button
              className={[styles.Key, styles.Key_game].join(' ')}
              onClick={handleBackClick}
            >
              &#9664;
            </button>
          )}
        </div>
      ))}
    </section>
  )
}

interface IKey {
  digit: number
  disabled: boolean
  handleKeyClick: React.MouseEventHandler<HTMLButtonElement>
}

const Key: React.FC<IKey> = (props) => {
  const { digit, disabled, handleKeyClick } = props

  return (
    <button
      className={styles.Key}
      data-digit={digit.toString()}
      disabled={disabled}
      onClick={handleKeyClick}
    >
      {digit}
    </button>
  )
}
