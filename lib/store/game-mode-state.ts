import { atom } from 'recoil'

export type GameMode = 'normal' | 'practice'

const gameModeState = atom<GameMode>({
  key: 'gameMode',
  default: 'normal',
})

export default gameModeState
