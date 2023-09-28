import { atom } from 'recoil'
import { Mon } from '@/app/types'

const answerMon = atom<Mon | undefined>({
  key: 'answerMon',
  default: undefined,
})

export default answerMon
