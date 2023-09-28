export interface Mon {
  id: number
  names: string
  image: string
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
