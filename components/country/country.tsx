import { getCountryFlagImgUrl } from '@/lib/helpers/location'
import classNames from 'classnames'
import { hasFlag } from 'country-flag-icons'
import Image from 'next/image'

export interface CountryProps {
  country?: string
  countryCode?: string
}

const Country: React.FC<CountryProps> = ({ country, countryCode }) => {
  return (
    <div
      className={classNames(
        'flex gap-1 items-center',
        country ? undefined : 'text-secondary',
      )}
    >
      {countryCode && hasFlag(countryCode) && (
        <Image
          src={getCountryFlagImgUrl(countryCode)}
          alt={countryCode}
          width={30}
          height={20}
        />
      )}
      {country || 'unknown'}
    </div>
  )
}

export default Country
