import { GAME_KEYS, GAME_NUM_CODE } from '@consts/game'

export const generateNumArray = (length: number): number[] => {
  return Array.from({ length }, (_, i) => i + 1)
}

export const generateGameCode = (): number[] => {
  const nums = generateNumArray(GAME_KEYS)
  const shuffledNums = [...nums]

  for (let i = shuffledNums.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffledNums[i], shuffledNums[j]] = [shuffledNums[j], shuffledNums[i]]
  }

  return shuffledNums.slice(0, GAME_NUM_CODE)
}

export const PERMITTED_KEYS_PRESSED = [
  'enter',
  'backspace',
  ...generateNumArray(GAME_KEYS).map((k) => k.toString()),
]
