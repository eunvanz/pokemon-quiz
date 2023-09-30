import useAchievedMonImages from '@/lib/hooks/use-achieved-mon-images'
import useCombo from '@/lib/hooks/use-combo'
import useGeneration from '@/lib/hooks/use-generation'
import useScore from '@/lib/hooks/use-score'
import useTypingSpeed from '@/lib/hooks/use-typing-speed'
import useUserLocation from '@/lib/hooks/use-user-location'
import { useCallback } from 'react'
import LeaderboardView from './leaderboard.view'

export default function LeaderBoardPage() {
  const { score } = useScore()
  const achievedMonImages = useAchievedMonImages()
  const { combo, maxCombo } = useCombo()
  const { typingSpeed } = useTypingSpeed()
  const { generation } = useGeneration()
  const userLocation = useUserLocation()

  const onSubmitName = useCallback(() => {}, [])

  return <LeaderboardView onSubmitName={} />
}
