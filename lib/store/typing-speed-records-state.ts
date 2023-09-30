import { atom } from 'recoil'

const typingSpeedRecordsState = atom<number[]>({
  key: 'typingSpeedRecords',
  default: [],
})

export default typingSpeedRecordsState
