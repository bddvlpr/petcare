<script lang="ts">
  import Icon from '@iconify/svelte';
  import type { PageData } from './$types';
  import Avatar from '$lib/components/content/Avatar.svelte';
  import Tooltip from '$lib/components/content/Tooltip.svelte';
  import RoutineCard from '$lib/components/content/RoutineCard.svelte';

  export let data: PageData;
</script>

<div>
  <div class="flex items-center">
    <div class="mr-auto">
      <h1 class="text-4xl font-bold text-primary">
        {data.pet.name}
      </h1>
    </div>
    <Avatar alt={data.pet.name} src={data.pet.picture} size="w-24" type="rounded" />
  </div>
  <div class="divider"></div>

  <div class="my-2 flex items-center">
    <h2 class="text-2xl font-semibold">Notes</h2>
    <a class="btn btn-circle btn-primary ml-auto" href="/pet/{data.pet.id}/edit">
      <Icon icon="ph:note-pencil" />
    </a>
  </div>
  <p>
    {data.pet.notes ?? 'None'}
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
        <RoutineCard routine={{ ...routine, pet: data.pet }} />
      {/each}
    {:else}
      None
    {/if}
  </div>
</div>

<div class="fixed bottom-10 right-8">
  <Tooltip text="Edit">
    <a class="btn btn-circle" href="/pet/{data.pet.id}/edit">
      <Icon class="h-6 w-6" icon="ph:note-pencil" />
    </a>
  </Tooltip>
  <Tooltip text="Archive">
    <a class="btn btn-circle btn-error" href="/pet/{data.pet.id}/archive">
      <Icon class="h-6 w-6" icon="ph:archive" />
    </a>
  </Tooltip>
</div>
