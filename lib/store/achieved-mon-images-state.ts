import { atom } from 'recoil'

const achievedMonImagesState = atom<string[]>({
  key: 'achievedMonImages',
  default: [],
})

export default achievedMonImagesState
