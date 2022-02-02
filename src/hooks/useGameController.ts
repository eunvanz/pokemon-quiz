import { useCallback, useEffect, useState } from "react";
import { random } from "lodash-es";
import useMonImages from "./useMonImages";
import useStage from "./useStage";

export interface GameController {
  duration: number;
  onStack: VoidFunction;
  onSuccess: VoidFunction;
  isLoading: boolean;
  resetGame: VoidFunction;
  currentMonImage?: string;
  currentColumn: number;
  stackedMonImages: string[][];
  achievedMonImages: string[];
}

export const INITIAL_DURATION = 20;
const MIN_DURATION = 5;

const useGameController: () => GameController = () => {
  const [duration, setDuration] = useState(INITIAL_DURATION);

  const [currentColumn, setCurrentColumn] = useState(random(0, 5));

  const { stage } = useStage();

  const {
    currentMonImage,
    achievedMonImages,
    isMonImagesLoading,
    pushAchievedMonImage,
    pushStackedMonImage,
    resetMonImages,
    stackedMonImages,
    allMons,
  } = useMonImages();

  const changeCurrentColumn = useCallback(() => {
    setCurrentColumn(random(0, 5));
  }, []);

  const changeDuration = useCallback(() => {
    if (allMons?.length && stage > 0) {
      const total = allMons.length;
      const stageRatio = total / stage;
      const durationInterval = INITIAL_DURATION - MIN_DURATION;
      const currentDuration = INITIAL_DURATION - durationInterval * stageRatio;
      setDuration(currentDuration);
    }
  }, [allMons?.length, stage]);

  const onStack = useCallback(() => {
    if (currentMonImage) {
      pushStackedMonImage(currentMonImage, currentColumn);
    }
  }, [currentMonImage, currentColumn]);

  const onSuccess = useCallback(() => {
    if (currentMonImage) {
      pushAchievedMonImage(currentMonImage);
    }
  }, [currentMonImage]);

  const resetGame = useCallback(() => {
    resetMonImages();
    setDuration(INITIAL_DURATION);
  }, []);

  useEffect(() => {
    changeCurrentColumn();
    changeDuration();
  }, [currentMonImage]);

  return {
    duration,
    currentColumn,
    currentMonImage,
    stackedMonImages,
    achievedMonImages,
    onStack,
    onSuccess,
    isLoading: isMonImagesLoading,
    resetGame,
  };
};

export default useGameController;
