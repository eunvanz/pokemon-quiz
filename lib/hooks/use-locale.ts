import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { useIsomorphicLayoutEffect, useLocalStorage } from 'usehooks-ts'
import { checkIsSSR } from '../helpers/common'
import localeState from '../store/locale-state'

const SUPPORTED_LANGUAGES = ['en', 'ko', 'ja', 'zh', 'fr', 'es', 'pt']

const useLocale = () => {
  const [lng, setLng] = useLocalStorage<string>(
    'lng',
    checkIsSSR()
      ? 'en'
      : window.localStorage.getItem('lng') ||
          window.navigator.languages.find((language) =>
            SUPPORTED_LANGUAGES.includes(language),
          ) ||
          'en',
  )
  const [locale, setLocale] = useRecoilState<string>(localeState)

  useIsomorphicLayoutEffect(() => {
    setLocale(lng)
  }, [lng, setLocale])

  useEffect(() => {
    locale && setLng(locale)
  }, [locale, setLng])

  return {
    locale,
    setLocale,
  }
}

export default useLocale
