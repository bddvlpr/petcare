<script lang="ts">
  import { page } from '$app/stores';
  import { signIn, signOut } from '@auth/sveltekit/client';
  import { PawPrint, Pill } from 'lucide-svelte';
  import NavBarIcon from './NavBarIcon.svelte';

  $: session = $page.data.session;
</script>

<div class="m-2 pb-2">
  <div class="navbar rounded-xl bg-base-200 p-3 shadow-xl">
    <div class="flex-1">
      <a class="btn btn-ghost text-xl" href="/">
        <Pill />
        Petcare
      </a>
    </div>
    <div class="flex-none gap-2">
      {#if session}
        <NavBarIcon href="/pets" tooltip="Pets">
          <PawPrint />
        </NavBarIcon>
        <NavBarIcon href="/medications" tooltip="Medications">
          <Pill />
        </NavBarIcon>
        <div class="dropdown dropdown-end">
          <button class="avatar btn btn-circle btn-ghost" tabindex="0">
            <div class="w-10 rounded-full">
              <img alt="User's portrait" src={session.user?.image} />
            </div>
          </button>
          <ul class="menu dropdown-content z-50 w-48 rounded-box bg-base-100 p-2 shadow">
            <li><button on:click={() => signOut()}>Log out</button></li>
          </ul>
        </div>
      {:else}
        <button class="btn btn-ghost" on:click={() => signIn('auth0')}>Log in</button>
      {/if}
    </div>
  </div>
</div>
