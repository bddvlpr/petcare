<script lang="ts">
  import type { PageData } from './$types';
  import RoutineCard from '$lib/components/routine/RoutineCard.svelte';
  import Floating from '$lib/components/content/Floating.svelte';
  import FloatingButton from '$lib/components/content/FloatingButton.svelte';

  export let data: PageData;
</script>

<h1 class="mb-4 text-center text-xl font-semibold text-primary">Routines due</h1>

<div class="m-2 flex flex-wrap justify-center gap-4">
  {#if data.dueRoutines.length}
    {#each data.dueRoutines as routine}
      <RoutineCard {routine} />
    {/each}
  {:else}
    All done for today.
  {/if}
</div>

<h1 class="mb-4 text-center text-xl font-semibold text-primary">All routines</h1>

<div class="m-2 flex flex-wrap justify-center gap-4">
  {#if data.routines.length}
    {#each data.routines as routine}
      <RoutineCard {routine} />
    {/each}
  {:else}
    None
  {/if}
</div>

<Floating>
  <FloatingButton text="Add" icon="ph:plus" type="btn-primary" href="/routines/add" />
</Floating>
