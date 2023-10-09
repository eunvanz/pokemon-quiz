import { useRecoilState } from 'recoil'
import { useIsomorphicLayoutEffect, useLocalStorage } from 'usehooks-ts'
import { checkIsSSR } from '../helpers/common'
import localeState from '../store/locale-state'

const useLocale = () => {
  const [lng] = useLocalStorage<string>(
    'lng',
    checkIsSSR()
      ? 'en'
      : window.localStorage.getItem('lng') ||
          Intl?.DateTimeFormat().resolvedOptions().locale,
  )
  const [locale, setLocale] = useRecoilState<string>(localeState)

  useIsomorphicLayoutEffect(() => {
    setLocale(lng)
  }, [lng, setLocale])

  return {
    locale,
    setLocale,
  }
}

export default useLocale
