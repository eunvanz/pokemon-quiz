import { useRecoilValue } from "recoil";
import stageState from "~/store/stageState";

const useStage = () => {
  const stage = useRecoilValue(stageState);
  return {
    stage,
  };
};

export default useStage;
