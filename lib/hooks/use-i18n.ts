import { useIsomorphicLayoutEffect } from 'usehooks-ts'
import useLocale from './use-locale'
import { useTranslation } from 'react-i18next'

const useI18n = () => {
  const { locale } = useLocale()

  const { i18n } = useTranslation()

  useIsomorphicLayoutEffect(() => {
    if (locale) {
      i18n.changeLanguage(locale).then(() => {
        i18n
      })
    }
  }, [locale])

  return i18n
}

export default useI18n
