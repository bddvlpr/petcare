<script lang="ts">
  import Icon from '@iconify/svelte';
  import type { PageData } from './$types';
  import { enhance } from '$app/forms';

  export let data: PageData;
</script>

<form class="mx-auto max-w-sm md:max-w-lg" method="POST" use:enhance>
  <h1 class="my-2 text-2xl font-semibold">Are you sure?</h1>
  <p>
    Are you sure you want to delete this routine log? The data will be permanently removed and will
    have to be re-entered in order to be used again.
  </p>
  <button class="btn btn-error my-2 w-full">Delete</button>

  <a href="/routine/{data.routine.id}">
    <Icon class="inline-block" icon="ph:arrow-left" />
    <span class="link">Return to routine page.</span>
  </a>
</form>
