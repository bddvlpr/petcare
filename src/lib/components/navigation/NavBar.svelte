<script lang="ts">
  import { page } from '$app/stores';
  import { signIn, signOut } from '@auth/sveltekit/client';
  import Icon from '@iconify/svelte';
  import NavBarIcon from './NavBarIcon.svelte';
  import { locale, locales, t } from '$lib/i18n';

  const updateLocale = (target: string) => {
    $locale = target;
    document.cookie = `lang=${target}`;
  };

  $: session = $page.data.session;
</script>

<div class="m-2 pb-2">
  <div class="navbar rounded-xl bg-base-200 p-3 shadow-xl">
    <div class="flex-1">
      <a class="btn btn-ghost md:text-xl" href="/">
        <Icon class="h-6 w-6" icon="ph:paw-print" />
        {$t('navbar.title')}
      </a>
    </div>
    <div class="flex-none gap-2">
      {#if session}
        <div>
          <NavBarIcon href="/pets" tooltip={$t('navbar.icons.pets')}>
            <Icon class="h-6 w-6" icon="ph:paw-print-fill" />
          </NavBarIcon>
          <NavBarIcon href="/routines" tooltip={$t('navbar.icons.routines')}>
            <Icon class="h-6 w-6" icon="ph:repeat-fill" />
          </NavBarIcon>
          <NavBarIcon href="/medications" tooltip={$t('navbar.icons.medications')}>
            <Icon class="h-6 w-6" icon="ph:pill-fill" />
          </NavBarIcon>
        </div>
        <div class="dropdown dropdown-end">
          <button class="avatar btn btn-circle btn-ghost" tabindex="0">
            <div class="w-10 rounded-full">
              <img alt="User's portrait" src={session.user?.image} />
            </div>
          </button>
          <ul class="menu dropdown-content z-50 w-48 rounded-box bg-base-100 p-2 shadow">
            <li>
              <details>
                <summary>{$t('navbar.actions.language')}</summary>
                <ul>
                  {#each $locales as locale}
                    <li>
                      <button on:click={() => updateLocale(locale)}>{$t(`lang.${locale}`)}</button>
                    </li>
                  {/each}
                </ul>
              </details>
            </li>
            <li>
              <button on:click={() => signOut()}>
                <Icon class="h-4 w-4" icon="ph:sign-out" />
                {$t('navbar.actions.logout')}
              </button>
            </li>
          </ul>
        </div>
      {:else}
        <button class="btn btn-ghost" on:click={() => signIn('auth0')}>
          <Icon class="h-4 w-4" icon="ph:sign-in" />
          {$t('navbar.actions.login')}
        </button>
      {/if}
    </div>
  </div>
</div>
