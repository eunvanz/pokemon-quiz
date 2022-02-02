import { useQuery } from "react-query";
import useApi from "./useApi";

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

  return {
    allMons,
    isAllMonsLoading,
  };
};

export default useAllMons;
