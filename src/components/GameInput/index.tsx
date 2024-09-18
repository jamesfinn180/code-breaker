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

  const layMarker = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault()

    if (value === '') return

    if (gameMarks[value]) {
      const colour = gameMarks[value].colour

      if (colour === 'red') {
        // Remove mark
        dispatch(removeGameMark(value))
      } else if (colour === 'green') {
        // Add orange
        dispatch(setGameMarks({ mark: value, colour: 'orange', position: pos }))
      } else if (colour === 'orange') {
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
        onMouseDown={layMarker}
        onFocus={(e) => e.target.blur()}
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
  const [mColour, setMColour] = useState<IMark['colour'] | ''>('')

  useEffect(() => {
    const c = mark.colour
    // GREEN: green for correct pos, orange everywhere else
    if (mark.colour === 'green') {
      if (mark.position === pos) setMColour(c)
      else setMColour('orange')
    }
    // ORANGE: orange everywhere
    else if (mark.colour === 'orange') setMColour(c)
    // RED: red everywhere
    else if (mark.colour === 'red') setMColour(c)
  }, [mark, pos])

  return mColour !== '' ? (
    <span className={clsx(styles.Marker, styles[`Marker_${mColour}`])}></span>
  ) : null
}
