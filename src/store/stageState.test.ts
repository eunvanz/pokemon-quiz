import { snapshot_UNSTABLE } from "recoil";
import achievedMonImagesAtom from "./achievedMonImagesState";
import stackedMonImagesAtom from "./stackedMonImagesState";
import stageState from "./stageState";

describe("stageAtom", () => {
  it("has current stage value", () => {
    const testSnapshot = snapshot_UNSTABLE(({ set }) => {
      set(achievedMonImagesAtom, ["mon1", "mon2"]);
      set(stackedMonImagesAtom, [["mon3", "mon4"], [], ["mon5"], [], ["mon6"], []]);
    });

    expect(testSnapshot.getLoadable(stageState).valueOrThrow()).toBe(7);
  });
});
