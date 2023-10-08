import i18n from 'i18next'
import translationEn from './translation.en.json'
import translationKo from './translation.ko.json'

i18n.init({
  lng: Intl?.DateTimeFormat().resolvedOptions().locale || 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      translation: translationEn,
    },
    ko: {
      translation: translationKo,
    },
  },
})

export default i18n
