import { atom } from 'recoil'
import { Mon } from '../types'

const stackedMonsState = atom<Mon[][]>({
  key: 'stackedMonImages',
  default: [[], [], [], [], [], []],
})

export default stackedMonsState
