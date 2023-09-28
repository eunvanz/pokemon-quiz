import { useRouter } from 'next/navigation'
import mockMons from '../mocks/mons'
import HomeView from './home.view'

export default function HomePage() {
  const router = useRouter()

  return (
    <HomeView
      onStart={() => router.push('/game-panel')}
      onNavigateToLeaderBoard={() => router.push('/leaderboard')}
      mons={mockMons.allMons}
      isLoading={false}
    />
  )
}
