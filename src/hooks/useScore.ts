import { useCallback } from "react";
import { useRecoilState } from "recoil";
import scoreState from "~/store/scoreState";

const useScore = () => {
  const [score, setScore] = useRecoilState(scoreState);

  const increaseScore = useCallback((wastedTime: number, combo: number) => {
    const bonusScore =
      Math.max(1000 - Math.floor(wastedTime / 1000) * 100, 100) + combo * 100;
    setScore((score) => score + bonusScore);
  }, []);

  const resetScore = useCallback(() => {
    setScore(0);
  }, []);

  return {
    score,
    increaseScore,
    resetScore,
  };
};

export default useScore;
