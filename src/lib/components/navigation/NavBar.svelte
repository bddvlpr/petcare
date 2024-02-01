<script lang="ts">
  import { page } from '$app/stores';
  import { signIn, signOut } from '@auth/sveltekit/client';
  import Icon from '@iconify/svelte';
  import NavBarIcon from './NavBarIcon.svelte';

  $: session = $page.data.session;
</script>

<div class="m-2 pb-2">
  <div class="navbar rounded-xl bg-base-200 p-3 shadow-xl">
    <div class="flex-1">
      <a class="btn btn-ghost md:text-xl" href="/">
        <Icon class="h-6 w-6" icon="ph:paw-print" />
        Petcare
      </a>
    </div>
    <div class="flex-none gap-2">
      {#if session}
        <div>
          <NavBarIcon href="/pets" tooltip="Pets">
            <Icon class="h-6 w-6" icon="ph:paw-print-fill" />
          </NavBarIcon>
          <NavBarIcon href="/routines" tooltip="Routines">
            <Icon class="h-6 w-6" icon="ph:repeat-fill" />
          </NavBarIcon>
          <NavBarIcon href="/medications" tooltip="Medications">
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
              <button on:click={() => signOut()}>
                <Icon class="h-4 w-4" icon="ph:door-fill" />
                Log out
              </button>
            </li>
          </ul>
        </div>
      {:else}
        <button class="btn btn-ghost" on:click={() => signIn('auth0')}>Log in</button>
      {/if}
    </div>
  </div>
</div>
