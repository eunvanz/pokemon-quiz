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

  return { accuracy, updateAccuracy }
}

export default useAccuracy
