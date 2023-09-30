import useGameController from '@/lib/hooks/use-game-controller'
import { useLayoutEffect } from 'react'
import GamePanel from './game-panel.view'

export default function GamePanelPage() {
  const props = useGameController()

  useLayoutEffect(() => {
    props.resetGame()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <GamePanel {...props} />
}
