import { atom } from 'recoil'
import { Generation } from '@/app/lib/types'

const generationState = atom<Generation>({
  key: 'generation',
  default: 0,
})

export default generationState
