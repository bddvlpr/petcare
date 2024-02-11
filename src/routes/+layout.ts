import { loadTranslations } from '$lib/i18n';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ url, data }) => {
  const initLanguage = 'en';

  await loadTranslations(initLanguage, url.pathname);

  return { ...data };
};
