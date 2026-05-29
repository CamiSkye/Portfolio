import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enCommon from './en/common.json';
import enContact from './en/contact.json';
import enCv from './en/cv.json';
import enHome from './en/home.json';
import enLegal from './en/legal.json';
import frCommon from './fr/common.json';
import frContact from './fr/contact.json';
import frCv from './fr/cv.json';
import frHome from './fr/home.json';
import frLegal from './fr/legal.json';

i18n.use(initReactI18next).init({
  resources: {
    fr: {
      common: frCommon,
      home: frHome,
      cv: frCv,
      contact: frContact,
      legal: frLegal,
    },
    en: {
      common: enCommon,
      home: enHome,
      cv: enCv,
      contact: enContact,
      legal: enLegal,
    },
  },
  lng: 'fr',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
