import { useCallback } from 'react'
import { useRecoilState } from 'recoil'
import scoreState from '../store/score-state'
import useStage from './use-stage'

const useScore = () => {
  const [score, setScore] = useRecoilState(scoreState)

  const { stage } = useStage()

  const increaseScore = useCallback(
    (wastedTime: number, combo: number) => {
      const bonusScore =
        Math.max(100 - Math.floor(wastedTime / 2000) * 10, 10) *
        (1 + combo * 0.2 + stage * 0.3)
      setScore((score) => score + bonusScore)
    },
    [setScore, stage],
  )

  const resetScore = useCallback(() => {
    setScore(0)
  }, [setScore])

  return {
    score,
    increaseScore,
    resetScore,
  }
}

export default useScore
