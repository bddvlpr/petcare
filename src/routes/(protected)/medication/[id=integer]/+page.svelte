<script lang="ts">
  import Avatar from '$lib/components/content/Avatar.svelte';
  import Icon from '@iconify/svelte';
  import type { PageData } from './$types';
  import Tooltip from '$lib/components/content/Tooltip.svelte';
  import RoutineCard from '$lib/components/content/RoutineCard.svelte';

  export let data: PageData;
</script>

<div>
  <div class="flex items-center">
    <div class="mr-auto">
      <h1 class="text-2xl font-bold text-primary">
        {data.medication.name}
      </h1>
      {data.routines.length} routine(s)
    </div>

    <Avatar alt={data.medication.name} src={data.medication.picture} size="w-24" type="rounded" />
  </div>
  <div class="divider"></div>

  <div class="my-2 flex items-center">
    <h2 class="text-2xl font-semibold">Notes</h2>
    <a class="btn btn-circle btn-primary ml-auto" href="/medication/{data.medication.id}/edit">
      <Icon icon="ph:note-pencil" />
    </a>
  </div>
  <p>
    {data.medication.notes ?? 'None'}
  </p>

  <div class="my-2 flex items-center">
    <h2 class="text-2xl font-semibold">Routines</h2>
    <a class="btn btn-circle btn-primary ml-auto" href="/routines/add">
      <Icon icon="ph:plus" />
    </a>
  </div>
  <div class="flex gap-2 overflow-x-scroll">
    {#if data.routines.length}
      {#each data.routines as routine}
        <RoutineCard routine={{ ...routine, medication: data.medication }} />
      {/each}
    {:else}
      None
    {/if}
  </div>
</div>

<div class="fixed bottom-10 right-8">
  <Tooltip text="Edit">
    <a class="btn btn-circle" href="/medication/{data.medication.id}/edit">
      <Icon class="h-6 w-6" icon="ph:note-pencil" />
    </a>
  </Tooltip>

  <Tooltip text="Add">
    <a class="btn btn-circle btn-error" href="/medication/{data.medication.id}/archive">
      <Icon class="h-6 w-6" icon="ph:archive" />
    </a>
  </Tooltip>
</div>
