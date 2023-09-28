import { Mon } from "~/types";
import requester from "./requester";

const getAllMons = async () => {
  const { data } = await requester.get<Mon[]>("mons");
  return data;
};

const api = {
  getAllMons,
};

export default api;
