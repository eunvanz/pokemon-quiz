import { useRecoilState } from 'recoil'
import gameModeState from '../store/game-mode-state'

const useGameMode = () => {
  const [gameMode, setGameMode] = useRecoilState(gameModeState)

  return {
    gameMode,
    setGameMode,
  }
}

export default useGameMode
