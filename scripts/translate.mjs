import { TranslationServiceClient } from '@google-cloud/translate'
import translationEn from '../lib/i18n/translation.en.json' assert { type: 'json' }
import fs from 'fs'

const translationClient = new TranslationServiceClient()

const projectId = 'pokedrops'
const location = 'global'

async function translateText() {
  const result = {}
  const languages = ['ja', 'zh', 'fr', 'es', 'pt']
  const KEYS_TO_IGNORE = ['gotcha', 'gotchaRate']
  const promises = languages.map(async (lng) => {
    if (!result[lng]) {
      result[lng] = {}
    }
    const components = Object.keys(translationEn)
    const componentPromises = components.map(async (component) => {
      if (!result[lng][component]) {
        result[lng][component] = {}
      }
      const keys = Object.keys(translationEn[component])
      const keyPromises = keys
        .filter((key) => !KEYS_TO_IGNORE.includes(key))
        .map(async (key) => {
          const text = translationEn[component][key]

          const request = {
            parent: `projects/${projectId}/locations/${location}`,
            contents: [text],
            mimeType: 'text/plain', // mime types: text/plain, text/html
            sourceLanguageCode: 'en',
            targetLanguageCode: lng,
          }

          const [response] = await translationClient.translateText(request)

          result[lng][component][key] = response.translations[0].translatedText
        })
      await Promise.all(keyPromises)
    })
    await Promise.all(componentPromises)
  })
  await Promise.all(promises)

  languages.forEach((lng) => {
    fs.writeFile(
      `./lib/i18n/translation.${lng}.json`,
      JSON.stringify(result[lng], null, 2),
      'utf-8',
      () => {},
    )
  })
}

translateText()
