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

export const colourConverter = (key: number) => {
  switch (key) {
    case 1:
      // Soft Lavender
      return {
        primary: '#e6e6fa',
        secondary: '#f0f0ff',
        symbol: '◾',
      }
    case 2:
      // Pale Peach
      return {
        primary: '#ffdab9',
        secondary: '#ffe5d9',
        symbol: '🔷',
      }
    case 3:
      // Mint Green
      return {
        primary: '#bef8be',
        secondary: '#b3ffb3',
        symbol: '▲',
      }
    case 4:
      // Baby Blue
      return {
        primary: '#bfefff',
        secondary: '#d9f1ff',
        symbol: '★',
      }
    case 5:
      // Light Brown
      return {
        primary: '#decbbe',
        secondary: '#f4b8b8',
        symbol: '♥',
      }
    case 6:
      // Butter Yellow
      return {
        primary: '#ffffe0',
        secondary: '#fffff5',
        symbol: '▼',
      }
    case 7:
      // Sky Blue
      return {
        primary: '#a9dff5',
        secondary: '#a3d9f4',
        symbol: '♠',
      }
    case 8:
      // Lavender Blush
      return {
        primary: '#ffdae6',
        secondary: '#fffbfa',
        symbol: '♣',
      }
    case 9:
      // Pale Turquoise
      return {
        primary: '#afeeee',
        secondary: '#c8f5f5',
        symbol: '',
      }
    case 10:
      // Peach Puff
      return {
        primary: '#ffdab9',
        secondary: '#ffe4e1',
        symbol: '&#10060;',
      }
    case 11:
      // Pale Goldenrod
      return {
        primary: '#eee8aa',
        secondary: '#f6f8ce',
        symbol: '',
      }
    case 12:
      // Light Pink
      return {
        primary: '#ffb6c1',
        secondary: '#ffc0cb',
        symbol: '',
      }
    default:
      return {
        primary: '#ffffff',
        secondary: '#000000',
        symbol: '',
      }
  }
}
