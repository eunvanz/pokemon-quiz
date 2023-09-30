import { useCallback, useState } from 'react'
import { useRecoilState } from 'recoil'
import scoreState from '../store/score-state'
import useAccuracy from './use-accuracy'
import useStage from './use-stage'

const useScore = () => {
  const [score, setScore] = useRecoilState(scoreState)
  const [bonusScore, setBonusScore] = useState<number | undefined>(undefined)

  const { accuracy } = useAccuracy()

  const { stage } = useStage()

  const increaseScore = useCallback(
    (wastedTime: number, combo: number) => {
      const bonusScore = Math.round(
        Math.max(100 - Math.floor(wastedTime / 2000) * 10, 10) *
          (1 + combo * 0.2 + Math.pow(1.03, stage)) *
          (accuracy / 10 || 1),
      )
      setScore((score) => score + bonusScore)
      setBonusScore(bonusScore)
    },
    [accuracy, setScore, stage],
  )

  const resetScore = useCallback(() => {
    setScore(0)
  }, [setScore])

  return {
    score,
    increaseScore,
    resetScore,
    bonusScore,
  }
}

export default useScore
