import { atom } from 'recoil'

const accuracyState = atom<number>({
  key: 'accuracy',
  default: 0,
})

export default accuracyState
