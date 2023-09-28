import { useRecoilState } from 'recoil'
import generationState from '../store/generation-state'

const useGeneration = () => {
  const [generation, setGeneration] = useRecoilState(generationState)

  return {
    generation,
    setGeneration,
  }
}

export default useGeneration
