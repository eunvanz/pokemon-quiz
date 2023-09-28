import { useCallback } from 'react'
import { useRecoilState } from 'recoil'
import scoreState from '../store/score-state'

const useScore = () => {
  const [score, setScore] = useRecoilState(scoreState)

  const increaseScore = useCallback(
    (wastedTime: number, combo: number) => {
      const bonusScore =
        Math.max(1000 - Math.floor(wastedTime / 2000) * 100, 100) + combo * 100
      setScore((score) => score + bonusScore)
    },
    [setScore],
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
