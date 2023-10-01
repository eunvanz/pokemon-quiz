import useGameController from '@/lib/hooks/use-game-controller'
import { GetServerSideProps } from 'next'
import { useLayoutEffect } from 'react'
import GamePanel from './game-panel.view'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {},
  }
}

export default function GamePanelPage() {
  const props = useGameController()

  useLayoutEffect(() => {
    props.resetGame()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <GamePanel {...props} />
}
