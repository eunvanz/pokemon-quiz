import { atom } from 'recoil'

const localeState = atom<string>({
  key: 'locale',
  default: 'en',
})

export default localeState
