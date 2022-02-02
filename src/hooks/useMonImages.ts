import { useCallback, useEffect, useMemo } from "react";
import { useAtom } from "jotai";
import { flatten, random } from "lodash-es";
import {
  achievedMonImagesAtom,
  currentMonImageAtom,
  stackedMonImagesAtom,
} from "~/store/atoms";
import useAllMons from "./useAllMons";

const useMonImages = () => {
  const { allMons, isAllMonsLoading } = useAllMons();

  const [stackedMonImages, setStackedMonImages] = useAtom(stackedMonImagesAtom);

  const [achievedMonImages, setAchievedMonImages] = useAtom(achievedMonImagesAtom);

  const [currentMonImage, setCurrentMonImage] = useAtom(currentMonImageAtom);

  const flattenStackedMonImages = useMemo(() => {
    return flatten(stackedMonImages);
  }, [stackedMonImages]);

  useEffect(() => {
    const filteredMons = allMons
      ?.filter((mon) => !flattenStackedMonImages.includes(mon.image))
      .filter((mon) => !achievedMonImages.includes(mon.image));
    if (filteredMons) {
      const index = random(filteredMons.length);
      setCurrentMonImage(filteredMons[index].image);
    } else {
      setCurrentMonImage(undefined);
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

  const resetMonImages = useCallback(() => {
    setStackedMonImages([[], [], [], [], [], []]);
    setAchievedMonImages([]);
  }, []);

  return {
    currentMonImage,
    isMonImagesLoading: isAllMonsLoading,
    stackedMonImages,
    achievedMonImages,
    pushAchievedMonImage,
    pushStackedMonImage,
    resetMonImages,
  };
};

export default useMonImages;
