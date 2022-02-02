import { useMemo, useState } from "react";
import { random } from "lodash-es";
import { useQuery } from "react-query";
import useApi from "./useApi";

const useMonImages = () => {
  const api = useApi();

  const { data: allMons, isLoading: isMonImagesLoading } = useQuery(
    "mons",
    api.getAllMons,
    {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  );

  const [currentMonIndex, setCurrentMonIndex] = useState<number | undefined>();

  const currentMonImage = useMemo(() => {}, []);

  const [stackedMonImages, setStackedMonImages] = useState<string[][]>([
    [],
    [],
    [],
    [],
    [],
    [],
  ]);

  return {
    currentMonImage,
    isMonImagesLoading,
  };
};

export default useMonImages;
