import useAllMons from '@/lib/hooks/use-all-mons'
import useGameController from '@/lib/hooks/use-game-controller'
import useGeneration from '@/lib/hooks/use-generation'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import HomeView from './home.view'

export default function HomePage() {
  const router = useRouter()

  const { setGeneration } = useGeneration()

  const { allMons, isAllMonsLoading } = useAllMons()

  const { resetGame } = useGameController()

  useEffect(() => {
    resetGame()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <HomeView
      onStart={() => router.push('/game-panel')}
      onNavigateToLeaderBoard={() => router.push('/leaderboard')}
      mons={allMons}
      onChangeGeneration={setGeneration}
      isLoading={isAllMonsLoading}
    />
  )
}
