import { useCallback, useMemo, useState } from "react";
import { flatten, random } from "lodash-es";
import useAllMons from "./useAllMons";

const useMonImages = () => {
  const { allMons, isAllMonsLoading } = useAllMons();

  const [stackedMonImages, setStackedMonImages] = useState<string[][]>([
    [],
    [],
    [],
    [],
    [],
    [],
  ]);

  const [achievedMonImages, setAchievedMonImages] = useState<string[]>([]);

  const flattenStackedMonImages = useMemo(() => {
    return flatten(stackedMonImages);
  }, [stackedMonImages]);

  const currentMonImage = useMemo(() => {
    const filteredMons = allMons
      ?.filter((mon) => !flattenStackedMonImages.includes(mon.image))
      .filter((mon) => !achievedMonImages.includes(mon.image));
    if (filteredMons) {
      const index = random(filteredMons.length);
      return filteredMons[index].image;
    }
  }, [allMons, flattenStackedMonImages, achievedMonImages]);

  const pushStackedMonImage = useCallback(
    (monImage: string, columnIndex: number) => {
      const newStackedMonImages = [...stackedMonImages];
      const oldColumnArray = stackedMonImages[columnIndex];
      const newColumnArray = [...oldColumnArray, monImage];
      newStackedMonImages[columnIndex] = newColumnArray;
      setStackedMonImages(newStackedMonImages);
    },
    [stackedMonImages],
  );

  const pushAchievedMonImage = useCallback(
    (monImage: string) => {
      setAchievedMonImages([...achievedMonImages, monImage]);
    },
    [achievedMonImages],
  );

  const reset = useCallback(() => {
    setStackedMonImages([[], [], [], [], [], []]);
    setAchievedMonImages([]);
  }, []);

  return {
    currentMonImage,
    isMonGameInfoLoading: isAllMonsLoading,
    stackedMonImages,
    achievedMonImages,
    pushAchievedMonImage,
    pushStackedMonImage,
    reset,
  };
};

export default useMonImages;
