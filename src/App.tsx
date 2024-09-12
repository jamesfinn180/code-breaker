import React from 'react'
import styles from './App.module.scss'
import { GameBoard } from '@components/GameBoard/'
import { Keyboard } from '@components/Keyboard'

const App: React.FC = () => {
  return (
    <div className={styles.App}>
      <div className={styles.Container}>
        <GameBoard />
        <Keyboard />
      </div>
    </div>
  )
}

export default App
