import { getCountryFlagImgUrl } from '@/lib/helpers/location'
import useI18n from '@/lib/hooks/use-i18n'
import classNames from 'classnames'
import { hasFlag } from 'country-flag-icons'
import Image from 'next/image'

export interface CountryProps {
  country?: string
  countryCode?: string
}

const Country: React.FC<CountryProps> = ({ country, countryCode }) => {
  const i18n = useI18n()

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
          width={21}
          height={14}
        />
      )}
      {country || i18n.t('common.unknown')}
    </div>
  )
}

export default Country
