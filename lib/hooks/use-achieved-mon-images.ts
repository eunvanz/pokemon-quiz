import { useRecoilValue } from 'recoil'
import achievedMonImagesState from '../store/achieved-mons-state'

const useAchievedMonImages = () => {
  const achievedMonImages = useRecoilValue(achievedMonImagesState)

  return achievedMonImages
}

export default useAchievedMonImages
