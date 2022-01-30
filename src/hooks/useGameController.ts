import { useCallback, useState } from "react";
import { random } from "lodash-es";

export interface GameController {
  duration: number;
  onStack: VoidFunction;
  currentMonImage?: string;
  currentColumn: number;
  stackedMonImages: string[][];
}

const INITIAL_DURATION = 20;

const useGameController: () => GameController = () => {
  const [duration, setDuration] = useState(20);

  const [currentColumn, setCurrentColumn] = useState(random(0, 5));

  const [currentMonImage, setCurrentMonImage] = useState<string | undefined>();

  const [stackedMonImages, setStackedMonImages] = useState<string[][]>([
    [],
    [],
    [],
    [],
    [],
    [],
  ]);

  const onStack = useCallback(() => {
    if (currentMonImage) {
      const newStackedMonImages = stackedMonImages.slice();
      newStackedMonImages[currentColumn].push(currentMonImage);
      setStackedMonImages(newStackedMonImages);
    }
  }, [currentMonImage, currentColumn]);

  return {
    duration,
    currentColumn,
    currentMonImage,
    stackedMonImages,
    onStack,
  };
};

export default useGameController;
