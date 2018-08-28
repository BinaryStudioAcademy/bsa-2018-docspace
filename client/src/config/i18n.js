import i18n from 'i18next'
import en from 'src/locales/en'
import uk from 'src/locales/uk'

export default i18n.init({
  resources: {
    en: en,
    uk: uk
  },
  fallbackLng: 'en',
  ns: 'translations',
  defaultNS: 'translations',
  lngs: ['en', 'uk'],
  lng: localStorage.getItem('language'),
  react: {
    wait: true
  }
})

export function getT () {
  return i18n.getFixedT(null, 'translations')
}
