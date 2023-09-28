import { useRecoilValue } from 'recoil'
import achievedMonImagesState from '../store/achieved-mon-images-state'

const useAchievedMonImages = () => {
  const achievedMonImages = useRecoilValue(achievedMonImagesState)

  return achievedMonImages
}

export default useAchievedMonImages
