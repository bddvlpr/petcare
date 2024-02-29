import i18n, { type Config } from 'sveltekit-i18n';
import lang from './lang.json';
import { dev } from '$app/environment';

export const defaultLocale = 'en';

export const config: Config<{
  placeholder?: string;
  value?: unknown;
  count?: number;
}> = {
  log: {
    level: dev ? 'warn' : 'error'
  },
  translations: {
    en: { lang },
    nl: { lang }
  },
  loaders: [
    {
      locale: 'en',
      key: 'navbar',
      loader: async () => (await import('./en/navbar.json')).default
    },
    {
      locale: 'nl',
      key: 'navbar',
      loader: async () => (await import('./nl/navbar.json')).default
    },
    {
      locale: 'en',
      key: 'common',
      loader: async () => (await import('./en/common.json')).default
    },
    {
      locale: 'nl',
      key: 'common',
      loader: async () => (await import('./nl/common.json')).default
    },
    {
      locale: 'en',
      key: 'pages',
      loader: async () => (await import('./en/pages.json')).default
    },
    {
      locale: 'nl',
      key: 'pages',
      loader: async () => (await import('./nl/pages.json')).default
    }
  ]
};

export const {
  addTranslations,
  loadTranslations,
  locale,
  locales,
  setLocale,
  setRoute,
  t,
  translations
} = new i18n(config);
