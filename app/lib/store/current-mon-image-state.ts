import { atom } from 'recoil'

const currentMonImageState = atom<string | undefined>({
  key: 'currentMonImage',
  default: undefined,
})

export default currentMonImageState
