import { flatten } from "lodash-es";
import { selector } from "recoil";
import achievedMonImagesState from "./achievedMonImagesState";
import stackedMonImagesState from "./stackedMonImagesState";

const stageState = selector<number>({
  key: "stage",
  get: ({ get }) => {
    return (
      flatten(get(stackedMonImagesState)).length + get(achievedMonImagesState).length + 1
    );
  },
});

export default stageState;
