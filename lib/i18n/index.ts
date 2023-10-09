import i18n from 'i18next'
import translationEn from './translation.en.json'
import translationKo from './translation.ko.json'
import translationEs from './translation.es.json'
import translationFr from './translation.fr.json'
import translationJa from './translation.ja.json'
import translationPt from './translation.pt.json'
import translationZh from './translation.zh.json'

i18n.init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      translation: translationEn,
    },
    ko: {
      translation: translationKo,
    },
    es: {
      translation: translationEs,
    },
    fr: {
      translation: translationFr,
    },
    ja: {
      translation: translationJa,
    },
    pt: {
      translation: translationPt,
    },
    zh: {
      translation: translationZh,
    },
  },
})

export default i18n
