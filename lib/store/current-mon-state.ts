import { atom } from 'recoil'
import { Mon } from '../types'

const currentMonState = atom<Mon | undefined>({
  key: 'currentMon',
  default: undefined,
})

export default currentMonState
