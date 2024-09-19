jest.mock('@consts/game', () => ({
  GAME_KEYS: 9,
  GAME_NUM_CODE: 4,
}))
import { generateNumArray, generateGameCode, colourConverter } from './utils'
import { GAME_KEYS, GAME_NUM_CODE } from '@consts/game'

describe('generateNumArray', () => {
  test('creates number array correctly', () => {
    expect(generateNumArray(10)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    expect(generateNumArray(5)).toEqual([1, 2, 3, 4, 5])
  })
})

describe('generateGameCode', () => {
  const gameCode = generateGameCode()

  test('creates correct array size', () => {
    expect(gameCode).toHaveLength(GAME_NUM_CODE)
  })

  test('creates all distinct unique numbers', () => {
    const gameCodeSet = new Set(gameCode)
    expect(gameCodeSet.size).toBe(gameCode.length)
  })

  test('creates numbers within min max range', () => {
    expect(Math.min(...gameCode)).toBeGreaterThanOrEqual(1)
    expect(Math.max(...gameCode)).toBeLessThanOrEqual(GAME_KEYS)
  })
})

describe('colourConverter', () => {
  test('to return the correct colours from number', () => {
    expect(colourConverter(1).primary).toBe('#e6e6fa')
    expect(colourConverter(2).primary).toBe('#ffdab9')
    expect(colourConverter(3).secondary).toBe('#b3ffb3')
  })

  test('to return the default colour from incorrect number', () => {
    expect(colourConverter(0).primary).toBe('#ffffff')
    expect(colourConverter(0).secondary).toBe('#000000')
  })
})
