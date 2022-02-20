export type QueryKey = "mons";

export interface Mon {
  id: number;
  names: string;
  image: string;
}

export type Generation = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 0;
