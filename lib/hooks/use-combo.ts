import { useCallback, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import comboState from '../store/combo-state'
import maxComboState from '../store/max-combo-state'

const useCombo = () => {
  const [combo, setCombo] = useRecoilState(comboState)
  const [maxCombo, setMaxCombo] = useRecoilState(maxComboState)

  const resetCombo = useCallback(() => {
    setCombo(0)
  }, [setCombo])

  const incrementCombo = useCallback(() => {
    setCombo((combo) => ++combo)
  }, [setCombo])

  useEffect(() => {
    if (combo > maxCombo) {
      setMaxCombo(combo)
    }
  }, [combo, maxCombo, setMaxCombo])

  const resetMaxCombo = useCallback(() => {
    setMaxCombo(0)
  }, [setMaxCombo])

  return {
    combo,
    resetCombo,
    incrementCombo,
    resetMaxCombo,
    maxCombo,
  }
}

export default useCombo
