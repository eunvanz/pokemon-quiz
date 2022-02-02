import { useAtom } from "jotai";
import { stageAtom } from "~/store/atoms";

const useStage = () => {
  const [stage] = useAtom(stageAtom);
  return {
    stage,
  };
};

export default useStage;
