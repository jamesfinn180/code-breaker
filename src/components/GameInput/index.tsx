import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import styles from './GameInput.module.scss'
import { colourConverter } from '@utils/utils'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../../store'
import { setGameMarks, removeGameMark } from '@slices/gameSlice'
import { IMark } from '@datatypes/game'

interface IGameInput {
  value: string
  pos: number
}
export const GameInput: React.FC<IGameInput> = (props) => {
  const { value, pos } = props
  const { gameMarks } = useSelector((state: RootState) => state.game)
  const dispatch = useDispatch<AppDispatch>()

  const style = clsx(styles.Input, { [styles.Input_swell]: value !== '' })
  const colNum = value === '' ? 0 : parseInt(value)

  const layMarker = () => {
    if (value === '') return

    if (gameMarks[value]) {
      const colour = gameMarks[value].colour

      if (colour === 'red') {
        // Remove mark
        dispatch(removeGameMark(value))
      } else if (colour === 'green') {
        // Add red
        dispatch(setGameMarks({ mark: value, colour: 'red', position: pos }))
      }
    } else {
      // Add green
      dispatch(setGameMarks({ mark: value, colour: 'green', position: pos }))
    }
  }

  return (
    <div className={styles.Container}>
      <input
        type="text"
        className={style}
        style={{ background: colourConverter(colNum).primary }}
        value={value}
        readOnly
        onClick={layMarker}
      />
      {gameMarks[value] && <InputMarker mark={gameMarks[value]} pos={pos} />}
    </div>
  )
}

interface IInputMarker {
  mark: IMark
  pos: number
}
const InputMarker: React.FC<IInputMarker> = (props) => {
  const { mark, pos } = props
  const [mColour, setMColour] = useState<IMark['colour'] | 'orange' | ''>('')

  useEffect(() => {
    // GREEN: green for correct pos, orange everywhere else
    if (mark.colour === 'green') {
      if (mark.position === pos) setMColour('green')
      else setMColour('orange')
    }
    // RED: red everywhere
    else if (mark.colour === 'red') setMColour('red')
  }, [mark, pos])

  return mColour !== '' ? (
    <span className={clsx(styles.Marker, styles[`Marker_${mColour}`])}></span>
  ) : null
}
