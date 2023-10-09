import { useIsomorphicLayoutEffect } from 'usehooks-ts'
import i18n from '../i18n'
import useLocale from './use-locale'

const useI18n = () => {
  const { locale } = useLocale()

  useIsomorphicLayoutEffect(() => {
    if (locale) {
      i18n.changeLanguage(locale)
    }
  }, [locale])

  return i18n
}

export default useI18n
