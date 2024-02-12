import { AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, AUTH0_ISSUER } from '$env/static/private';
import { defaultLocale, locales } from '$lib/i18n';
import { SvelteKitAuth } from '@auth/sveltekit';
import Auth0 from '@auth/sveltekit/providers/auth0';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const handleAuth = SvelteKitAuth({
  providers: [
    Auth0({
      clientId: AUTH0_CLIENT_ID,
      clientSecret: AUTH0_CLIENT_SECRET,
      issuer: AUTH0_ISSUER
    })
  ]
});

const handleLocale: Handle = async ({ event, resolve }) => {
  const { url, request, isDataRequest } = event;
  const { pathname, origin } = url;

  if (new RegExp(/^\/[^.]*([?#].*)?$/).test(pathname)) {
    const supportedLocales = locales.get().map((l) => l.toLowerCase());

    let locale = supportedLocales.find(
      (l) => l === `${pathname.match(/[^/]+?(?=\/|$)/)}`.toLowerCase()
    );

    if (locale === defaultLocale && !request.headers.get('prevent-redirect')) {
      const localeRegex = new RegExp(`^/${locale}`);
      const location = `${pathname}`.replace(localeRegex, '') || '/';

      return new Response(undefined, { headers: { location }, status: 301 });
    } else if (!locale) {
      if (!isDataRequest) {
        locale =
          `${`${request.headers.get('accept-language')}`.match(/[a-zA-Z]+?(?=-|_|,|;)/)}`.toLowerCase();
      }

      if (!locale || !supportedLocales.includes(locale)) locale = defaultLocale;

      if (locale === defaultLocale) {
        const path = `${pathname}`.replace(/\/$/, '');
        const redirectTo = `${origin}/${locale}${path}${isDataRequest ? '/__data.json?x-sveltekit-invalidated=100' : ''}`;

        request.headers.set('prevent-redirect', '1');

        const response = await fetch(redirectTo, request);
        const data = await response.text();

        return new Response(data, {
          ...response,
          headers: {
            ...response.headers,
            'Content-Type': isDataRequest ? 'application/json' : 'text/html'
          }
        });
      }

      return new Response(undefined, {
        headers: { location: `/${locale}${pathname}` },
        status: 301
      });
    }

    event.locals.lang = locale;
    return resolve(event, {
      transformPageChunk: ({ html }) => html.replace('%lang%', `${locale}`)
    });
  }

  return resolve(event);
};

export const handle = sequence(handleLocale, handleAuth);
