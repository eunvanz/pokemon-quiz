import { atom } from 'recoil'

const comboState = atom<number>({ key: 'combo', default: 0 })

export default comboState
