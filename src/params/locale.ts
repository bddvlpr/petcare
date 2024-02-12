import { locales } from '$lib/i18n';
import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (param) => {
  const definedLocales = locales.get();
  const paths = [...definedLocales, ''];
  const slashPaths = paths.map((l) => `${l}/`);

  return [...paths, ...slashPaths].includes(param);
};
