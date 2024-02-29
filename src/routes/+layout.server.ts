import { defaultLocale, loadTranslations, locales, translations } from '$lib/i18n';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ url, cookies, request, locals }) => {
  const { pathname } = url;

  let locale = (cookies.get('lang') || '').toLowerCase();
  if (!locale)
    locale =
      `${`${request.headers.get('accept-language')}`.match(/[a-zA-Z]+?(?=-|_|,|;)/)}`.toLowerCase();

  const supportedLocales = locales.get().map((l) => l.toLowerCase());
  if (!supportedLocales.includes(locale)) locale = defaultLocale;

  await loadTranslations(locale, pathname);

  return {
    session: await locals.auth(),
    i18n: { locale, route: pathname },
    translations: translations.get()
  };
};
