import { useContext } from "react";
import { ApiContext } from "~/api/apiContext";

const useApi = () => {
  const api = useContext(ApiContext);
  return api;
};

export default useApi;
