import { atom } from 'recoil'

const stackedMonImagesState = atom<string[][]>({
  key: 'stackedMonImages',
  default: [[], [], [], [], [], []],
})

export default stackedMonImagesState
