import useAllMons from '@/lib/hooks/use-all-mons'
import useGeneration from '@/lib/hooks/use-generation'
import useUserLocation from '@/lib/hooks/use-user-location'
import { useRouter } from 'next/navigation'
import HomeView from './home.view'

export default function HomePage() {
  const router = useRouter()

  const { setGeneration } = useGeneration()

  const { allMons, isAllMonsLoading } = useAllMons()

  useUserLocation()

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
