import useGameController from '@/lib/hooks/use-game-controller'
import GamePanel from './game-panel.view'

export default function GamePanelPage() {
  const props = useGameController()

  return <GamePanel {...props} />
}
