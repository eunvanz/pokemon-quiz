import { useRecoilValue } from "recoil";
import achievedMonImagesState from "~/store/achievedMonImagesState";

const useAchievedMonImages = () => {
  const achievedMonImages = useRecoilValue(achievedMonImagesState);

  return achievedMonImages;
};

export default useAchievedMonImages;
