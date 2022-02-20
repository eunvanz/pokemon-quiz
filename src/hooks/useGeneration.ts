import { useRecoilState } from "recoil";
import generationState from "~/store/generationState";

const useGeneration = () => {
  const [generation, setGeneration] = useRecoilState(generationState);

  return {
    generation,
    setGeneration,
  };
};

export default useGeneration;
