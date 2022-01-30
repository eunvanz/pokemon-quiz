export type QueryKey = "mons";

export interface Mon {
  id: number;
  name: string;
  nameKo?: string | null;
  nameJa?: string | null;
  nameZh?: string | null;
}
