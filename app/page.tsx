import { useRouter } from 'next/navigation'
import mockMons from './mocks/mons'
import HomeView from './page.view'

export default function Home() {
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
