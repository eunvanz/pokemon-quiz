import { atom } from 'recoil'
import { Generation } from '@/lib/types'

const generationState = atom<Generation>({
  key: 'generation',
  default: 0,
})

export default generationState
