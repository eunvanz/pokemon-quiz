import { useCallback, useEffect, useMemo } from "react";
import { flatten, shuffle } from "lodash-es";
import { useRecoilState } from "recoil";
import achievedMonImagesState from "~/store/achievedMonImagesState";
import currentMonImageState from "~/store/currentMonImageState";
import stackedMonImagesState from "~/store/stackedMonImagesState";
import useAllMons from "./useAllMons";

const useMonImages = () => {
  const { allMons, isAllMonsLoading } = useAllMons();

  const [stackedMonImages, setStackedMonImages] = useRecoilState(stackedMonImagesState);

  const [achievedMonImages, setAchievedMonImages] =
    useRecoilState(achievedMonImagesState);

  const [currentMonImage, setCurrentMonImage] = useRecoilState(currentMonImageState);

  const isGameOver = useMemo(() => {
    return stackedMonImages.some((array) => array.length === 12);
  }, [stackedMonImages]);

  const flattenStackedMonImages = useMemo(() => {
    return flatten(stackedMonImages);
  }, [stackedMonImages]);

  const shuffledMons = useMemo(() => {
    return shuffle(allMons);
  }, [allMons]);

  useEffect(() => {
    if (
      !isGameOver &&
      flattenStackedMonImages.length + achievedMonImages.length < shuffledMons.length
    ) {
      setCurrentMonImage(
        shuffledMons[flattenStackedMonImages.length + achievedMonImages.length]?.image,
      );
    } else {
      setCurrentMonImage(undefined);
    }
  }, [shuffledMons, flattenStackedMonImages, achievedMonImages]);

  const nextMonImage = useMemo(() => {
    return shuffledMons[flattenStackedMonImages.length + achievedMonImages.length + 1]
      ?.image;
  }, [shuffledMons, flattenStackedMonImages, achievedMonImages]);

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
    nextMonImage,
    currentMonImage,
    isMonImagesLoading: isAllMonsLoading,
    stackedMonImages,
    achievedMonImages,
    pushAchievedMonImage,
    pushStackedMonImage,
    resetMonImages,
    allMons,
    isGameOver,
  };
};

export default useMonImages;
