import { countries, zones } from 'moment-timezone/data/meta/latest.json'

export const getTimeZoneToCountryMap = () => {
  const timeZoneToCountryMap: Record<string, { name: string; abbr: string }> =
    {}
  Object.keys(zones).forEach((zone) => {
    const cityArr = zone.split('/')
    const city = cityArr[cityArr.length - 1]
    // @ts-ignore
    timeZoneToCountryMap[city] = countries[zones[zone].countries[0]]
  })
  return timeZoneToCountryMap
}

export const getUserLocationFromTimeZone = () => {
  const timeZone = Intl?.DateTimeFormat().resolvedOptions().timeZone
  if (timeZone) {
    const tzArr = timeZone.split('/')
    const region = tzArr[0]
    const city = tzArr[tzArr.length - 1]
    const { name, abbr } = getTimeZoneToCountryMap()[city]
    return {
      city,
      country: name,
      countryCode: abbr,
      region,
    }
  } else {
    return undefined
  }
}

export const getCountryFlagImgUrl = (countryCode: string) => {
  return `http://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCode.toUpperCase()}.svg`
}
