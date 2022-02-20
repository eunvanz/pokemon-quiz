import { useMemo } from "react";
import { useQuery } from "react-query";
import { GENERATIONS } from "~/constants/rules";
import useApi from "./useApi";
import useGeneration from "./useGeneration";

const useAllMons = () => {
  const api = useApi();

  const { data: allMons, isLoading: isAllMonsLoading } = useQuery(
    "allMons",
    api.getAllMons,
    {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  );

  const { generation } = useGeneration();

  const generationMons = useMemo(() => {
    if (generation) {
      if (generation === 1) {
        return allMons?.filter((mon) => mon.id <= GENERATIONS[1]);
      } else {
        return allMons?.filter(
          (mon) =>
            mon.id > GENERATIONS[(generation - 1) as keyof typeof GENERATIONS] &&
            mon.id <= GENERATIONS[generation as keyof typeof GENERATIONS],
        );
      }
    } else {
      return allMons;
    }
  }, [allMons]);

  return {
    allMons: generationMons,
    isAllMonsLoading,
  };
};

export default useAllMons;
