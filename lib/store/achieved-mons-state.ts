import { atom } from 'recoil'
import { Mon } from '../types'

const achievedMonsState = atom<Mon[]>({
  key: 'achievedMons',
  default: [],
})

export default achievedMonsState
