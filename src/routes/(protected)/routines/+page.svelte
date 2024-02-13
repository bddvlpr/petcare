<script lang="ts">
  import RoutineCard from '$lib/components/content/RoutineCard.svelte';
  import Tooltip from '$lib/components/content/Tooltip.svelte';
  import Icon from '@iconify/svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<h1 class="mb-4 text-center text-xl font-semibold text-primary">Routines due</h1>

<div class="m-2 flex flex-wrap justify-center gap-4">
  {#each data.dueRoutines as routine}
    <RoutineCard {routine} />
  {/each}
</div>

<div class="fixed bottom-10 right-8">
  <Tooltip text="Add">
    <a class="btn btn-circle btn-primary" href="/routines/add">
      <Icon class="h-6 w-6" icon="ph:plus" />
    </a>
  </Tooltip>
</div>
