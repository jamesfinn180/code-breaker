import { configureStore } from '@reduxjs/toolkit'
import gameReducer from './slices/gameSlice'
import { ThunkAction } from 'redux-thunk'
import { Action } from 'redux'

const store = configureStore({
  reducer: {
    game: gameReducer,
  },
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
