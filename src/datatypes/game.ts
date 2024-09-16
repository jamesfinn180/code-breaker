export interface IWinsAndLosses {
  wins: number
  losses: number
}

interface IWins {
  wins: number
  losses?: never
}
interface ILosses {
  wins?: never
  losses: number
}
export type WinsOrLossesT = IWins | ILosses

export interface IGameState {
  code: number[]
  guesses: string[][]
  gameStatus: 'win' | 'lose' | 'active'
  winsAndLosses: IWinsAndLosses
  showModal: boolean
}