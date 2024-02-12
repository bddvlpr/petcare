import i18n from 'sveltekit-i18n';
import { dev } from '$app/environment';
import lang from './lang.json';

export const defaultLocale = 'en';

export const {
  t,
  locale,
  locales,
  loading,
  addTranslations,
  loadTranslations,
  translations,
  setLocale,
  setRoute
} = new i18n({
  log: {
    level: dev ? 'warn' : 'error'
  },
  fallbackLocale: defaultLocale,
  translations: {
    en: { lang },
    nl: { lang }
  },
  loaders: [
    {
      locale: 'en',
      key: 'global',
      loader: async () => (await import('./en/global.json')).default
    },
    {
      locale: 'nl',
      key: 'global',
      loader: async () => (await import('./nl/global.json')).default
    }
  ]
});
