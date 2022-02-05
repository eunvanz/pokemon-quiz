import { atom } from "recoil";

const scoreState = atom<number>({ key: "score", default: 0 });

export default scoreState;
