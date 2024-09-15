export interface IGameState {
  code: number[]
  guesses: string[][]
  gameStatus: 'win' | 'lose' | 'active'
  showModal: boolean
}
