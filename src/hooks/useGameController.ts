import { useCallback, useEffect, useState } from "react";
import { random } from "lodash-es";
import useMonImages from "./useMonImages";

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

const INITIAL_DURATION = 20;

const useGameController: () => GameController = () => {
  const [duration, setDuration] = useState(INITIAL_DURATION);

  const [currentColumn, setCurrentColumn] = useState(random(0, 5));

  const {
    currentMonImage,
    achievedMonImages,
    isMonImagesLoading,
    pushAchievedMonImage,
    pushStackedMonImage,
    resetMonImages,
    stackedMonImages,
  } = useMonImages();

  const changeCurrentColumn = useCallback(() => {
    setCurrentColumn(random(0, 5));
  }, []);

  const changeDuration = useCallback(() => {}, []);

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
  }, []);

  useEffect(() => {
    changeCurrentColumn();
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
