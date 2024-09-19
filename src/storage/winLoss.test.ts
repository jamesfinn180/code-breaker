import { initialWinsLosses } from '@slices/gameSlice'
import {
  WIN_LOSS_STORAGE,
  getWinLossRatioStorage,
  setWinLossRatioStorage,
  updateWinLossRatioStorage,
} from './winLoss'

const mockLocalStorage = (() => {
  let store: { [key: string]: string } = {}
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString()
    },
    clear: () => {
      store = {}
    },
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
})

describe('Win/Loss Local Storage', () => {
  afterEach(() => {
    localStorage.clear()
  })

  test('getWinLossRatioStorage returns initialWinsLosses when empty', () => {
    const result = getWinLossRatioStorage()
    expect(result).toEqual(initialWinsLosses)
  })

  test('getWinLossRatioStorage returns correct value', () => {
    const testValue = { wins: 2, losses: 3 }
    localStorage.setItem(WIN_LOSS_STORAGE, JSON.stringify(testValue))
    const result = getWinLossRatioStorage()
    expect(result).toEqual(testValue)
  })

  test('setWinLossRatioStorage correctly sets new value', () => {
    const testValue = { wins: 1, losses: 0 }
    setWinLossRatioStorage(testValue)
    const result = getWinLossRatioStorage()
    expect(result).toEqual(testValue)
  })

  test('updateWinLossRatioStorage successfully updates win', () => {
    const testValue = { wins: 2, losses: 2 }
    localStorage.setItem(WIN_LOSS_STORAGE, JSON.stringify(testValue))

    updateWinLossRatioStorage({ wins: 1 })
    const result = getWinLossRatioStorage()

    expect(result).toEqual({ wins: 3, losses: 2 })
  })

  test('updateWinLossRatioStorage successfully updates loss', () => {
    const testValue = { wins: 2, losses: 2 }
    localStorage.setItem(WIN_LOSS_STORAGE, JSON.stringify(testValue))

    updateWinLossRatioStorage({ losses: 1 })
    const result = getWinLossRatioStorage()

    expect(result).toEqual({ wins: 2, losses: 3 })
  })
})
