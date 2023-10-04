import useAllMons from '@/lib/hooks/use-all-mons'
import useGameController from '@/lib/hooks/use-game-controller'
import useGeneration from '@/lib/hooks/use-generation'
import { GameMode } from '@/lib/store/game-mode-state'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'
import HomeView from './home.view'

export default function HomePage() {
  const router = useRouter()

  const { setGeneration } = useGeneration()

  const { allMons, isAllMonsLoading } = useAllMons()

  const { resetGame, setGameMode } = useGameController()

  const onStart = useCallback(
    (gameMode: GameMode) => {
      setGameMode(gameMode)
      router.push('/game-panel')
    },
    [router, setGameMode],
  )

  useEffect(() => {
    resetGame()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <HomeView
      onStart={onStart}
      onNavigateToLeaderBoard={() => router.push('/leaderboard')}
      mons={allMons}
      onChangeGeneration={setGeneration}
      isLoading={isAllMonsLoading}
    />
  )
}
