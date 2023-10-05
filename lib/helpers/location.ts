import { countries, zones } from 'moment-timezone/data/meta/latest.json'

export const getTimeZoneToCountryMap = () => {
  const timeZoneToCountryMap: Record<string, string> = {}
  Object.keys(zones).forEach((zone) => {
    const cityArr = zone.split('/')
    const city = cityArr[cityArr.length - 1]
    // @ts-ignore
    timeZoneToCountryMap[city] = countries[zones[zone].countries[0]].name
  })
  return timeZoneToCountryMap
}

export const getUserLocationFromTimeZone = () => {
  if (Intl) {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const tzArr = timeZone.split('/')
    const region = tzArr[0]
    const city = tzArr[tzArr.length - 1]
    const country = getTimeZoneToCountryMap()[city]
    return {
      city,
      country,
      region
    }
  } else {
    return undefined
  }
}

