export interface Mon {
  id: number
  names: string
  image: string
  shownCnt: number
  gottenCnt: number
}

export type Generation = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 0

export interface UserLocation {
  status: 'success' | 'fail'
  country: string
  countryCode: string
  region: string
  regionName: string
  city: string
  zip: string
  lat: number
  lon: number
  timezone: string
  isp: string
  org: string
  as: string
  query: string
}

export interface Rank {
  id: number
  seq: number
  name: string
  country?: string
  city?: string
  countryCode?: string
  ip?: string
  generation: number
  score: number
  gotcha: number
  maxCombo: number
  avgSpeed: number
  maxSpeed: number
  accuracy: number
  gotchaMons: number[]
}

export type RankDto = Omit<Rank, 'id' | 'seq'>

export interface Pageable<T> {
  items: T[]
  meta: {
    itemCount: number
    totalItems: number
    itemsPerPage: number
    totalPages: number
    currentPage: number
  }
}

export interface UpdateMonCountDto {
  result: {
    id: number
    isGotten: boolean
  }[]
}

export interface RankSearchParams {
  name?: string
  country?: string
  page: number
  isUniqueName?: boolean
}
