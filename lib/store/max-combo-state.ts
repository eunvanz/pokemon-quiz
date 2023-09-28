import { atom } from 'recoil'

const maxComboState = atom<number>({ key: 'maxCombo', default: 0 })

export default maxComboState
