import { GAME_NUM_CODE, GAME_GUESSES } from '@consts/game'
import { IGameState } from '@datatypes/game'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { generateGameCode } from '@utils/utils'
import { AppThunk } from '../store'
import {
  getWinLossRatioStorage,
  updateWinLossRatioStorage,
} from '@storage/winLoss'

export const initialWinsLosses = { wins: 0, losses: 0 }

const initialGameState: IGameState = {
  code: [1, 2, 3, 4],
  guesses: [[]],
  gameStatus: 'active',
  winsAndLosses: initialWinsLosses,
  showModal: false,
}

export const gameSlice = createSlice({
  name: 'gameAction',
  initialState: initialGameState,
  reducers: {
    setGuessKey: (state, action: PayloadAction<string>) => {
      const g = [...state.guesses]
      // Prevent input if no space left or if number is already applied
      if (
        g[g.length - 1].length < GAME_NUM_CODE &&
        !g[g.length - 1].includes(action.payload)
      ) {
        g[g.length - 1].push(action.payload)
      }
      state.guesses = [...g]
    },

    removeGuessKey: (state) => {
      const g = [...state.guesses]
      if (g[g.length - 1].length > 0) {
        g[g.length - 1].pop()
      }
      state.guesses = [...g]
    },

    submitGuess: (state) => {
      // Guess is added to guesses in setGuessKey
      // This adds the next line to the guess array
      const g = [...state.guesses]
      if (
        g[g.length - 1].length === GAME_NUM_CODE &&
        state.gameStatus === 'active'
      ) {
        g.push([])
      }
      state.guesses = [...g]
    },

    setGameStatus: (state) => {
      const g = [...state.guesses]
      const userGuessCode = g[g.length - 1].join('')
      if (userGuessCode === state.code.join('')) {
        // User has Won
        state.gameStatus = 'win'
        state.showModal = true
        updateWinLossRatioStorage({ wins: 1 })
      } else if (g.length >= GAME_GUESSES) {
        // User has Lost
        state.gameStatus = 'lose'
        state.showModal = true
        updateWinLossRatioStorage({ losses: 1 })
      }
    },

    resetGame: (state) => {
      state.gameStatus = 'active'
      state.guesses = [[]]
      state.code = generateGameCode()
      state.winsAndLosses = getWinLossRatioStorage()
    },

    setShowModal: (state, action: PayloadAction<boolean>) => {
      state.showModal = action.payload
    },
  },
})

export const {
  setGuessKey,
  removeGuessKey,
  submitGuess,
  setGameStatus,
  resetGame,
  setShowModal,
} = gameSlice.actions

export default gameSlice.reducer

export const submitGuessAndCheckStatus =
  (): AppThunk => (dispatch, getState) => {
    const { guesses } = getState().game
    const lastGuess = guesses[guesses.length - 1]

    if (lastGuess.length === GAME_NUM_CODE) {
      dispatch(setGameStatus())
      dispatch(submitGuess())
    }
  }
