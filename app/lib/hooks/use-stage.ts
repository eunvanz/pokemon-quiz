import { useRecoilValue } from 'recoil'
import stageState from '../store/stage-state'

const useStage = () => {
  const stage = useRecoilValue(stageState)
  return {
    stage,
  }
}

export default useStage
