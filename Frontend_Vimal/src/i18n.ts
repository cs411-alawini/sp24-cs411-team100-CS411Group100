import i18n from 'i18next'
import Detector from "i18next-browser-languagedetector";
import Backend from 'i18next-xhr-backend'
import { initReactI18next } from 'react-i18next'

i18n
    .use(Detector)
    .use(Backend)
    .use(initReactI18next)
    .init({
        // lng: 'en', /* Fix language to en */
        backend: {
            /* translation file path */
            loadPath: '/assets/translations/{{ns}}/{{lng}}.json'
        },
        fallbackLng: 'en',
        debug: false,
        ns: ['app', 'common'],
        defaultNS: 'app',
        interpolation: {
            escapeValue: false
        }
    })

export default i18n