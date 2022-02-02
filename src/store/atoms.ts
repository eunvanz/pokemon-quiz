import { atom } from "jotai";
import { flatten } from "lodash-es";

export const stackedMonImagesAtom = atom<string[][]>([[], [], [], [], [], []]);

export const achievedMonImagesAtom = atom<string[]>([]);

export const currentMonImageAtom = atom<string | undefined>(undefined);

export const stageAtom = atom<number>((get) => {
  return (
    flatten(get(stackedMonImagesAtom)).length + get(achievedMonImagesAtom).length + 1
  );
});
