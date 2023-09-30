import { useCallback, useState } from 'react'
import { useRecoilState } from 'recoil'
import accuracyState from '../store/accuracy-state'

const useAccuracy = () => {
  const [accuracy, setAccuracy] = useRecoilState(accuracyState)

  const [tryCnt, setTryCnt] = useState(0)

  const updateAccuracy = useCallback(
    (isSuccessful: boolean) => {
      const newTryCnt = tryCnt + 1
      setTryCnt(newTryCnt)
      setAccuracy((oldAccuracy) => {
        return Number(
          (
            (oldAccuracy * tryCnt + (isSuccessful ? 100 : 0)) /
            newTryCnt
          ).toFixed(1),
        )
      })
    },
    [setAccuracy, tryCnt],
  )

  const resetAccuracy = useCallback(() => {
    setAccuracy(100)
    setTryCnt(0)
  }, [setAccuracy])

  return { accuracy, updateAccuracy, resetAccuracy }
}

export default useAccuracy
