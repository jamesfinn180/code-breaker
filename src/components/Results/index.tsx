import React from 'react'
import styles from './Results.module.scss'
import { useSelector } from 'react-redux'
import { RootState } from 'src/store'
import clsx from 'clsx'

export const Results: React.FC = () => {
  const { guesses, code } = useSelector((state: RootState) => state.game)

  const returnColour = (num: number, i: number) => {
    if (num === code[i]) {
      return 'green'
    } else if (code.includes(num)) {
      return 'orange'
    }
    return 'red'
  }
  return (
    <div className={styles.Container}>
      <div className={styles.Row}>
        {code.map((c) => {
          return (
            <div key={c} className={styles.Answer}>
              {c}
            </div>
          )
        })}
      </div>
      {guesses.map((row, i) => {
        return (
          <div key={i} className={styles.Row}>
            {row.map((result, i) => {
              return (
                <div
                  key={i}
                  className={clsx(
                    styles.Result,
                    styles[`Result_${returnColour(parseInt(result), i)}`]
                  )}
                >
                  {result}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
