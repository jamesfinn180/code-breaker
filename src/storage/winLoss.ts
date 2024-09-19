import { LOCAL_STORAGE_PREFIX } from '@consts/game'
import { IWinsAndLosses, WinsOrLossesT } from '@datatypes/game'
import { initialWinsLosses } from '@slices/gameSlice'

export const WIN_LOSS_STORAGE = `${LOCAL_STORAGE_PREFIX}winLoss`

export const getWinLossRatioStorage = () => {
  let winsAndLossStr = localStorage.getItem(WIN_LOSS_STORAGE)
  if (!winsAndLossStr) {
    winsAndLossStr = JSON.stringify(initialWinsLosses)
  }
  return JSON.parse(winsAndLossStr)
}

export const setWinLossRatioStorage = (winsAndLosses: IWinsAndLosses) => {
  localStorage.setItem(WIN_LOSS_STORAGE, JSON.stringify(winsAndLosses))
}

export const updateWinLossRatioStorage = (
  winOrLoss?: WinsOrLossesT
): IWinsAndLosses => {
  const winsAndLossObj = getWinLossRatioStorage()

  if (winOrLoss?.wins) {
    winsAndLossObj.wins += winOrLoss.wins
  } else if (winOrLoss?.losses) {
    winsAndLossObj.losses += winOrLoss.losses
  }

  setWinLossRatioStorage(winsAndLossObj)
  return winsAndLossObj
}
