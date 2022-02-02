import { atom } from "jotai";

export const stackedMonImagesAtom = atom<string[][]>([[], [], [], [], [], []]);

export const achievedMonImagesAtom = atom<string[]>([]);

export const currentMonImageAtom = atom<string | undefined>(undefined);
