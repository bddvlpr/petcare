<script lang="ts">
  import Icon from '@iconify/svelte';
  import type { PageData } from './$types';
  import Avatar from '$lib/components/content/Avatar.svelte';
  import Floating from '$lib/components/content/Floating.svelte';
  import FloatingButton from '$lib/components/content/FloatingButton.svelte';
  import RoutineCard from '$lib/components/routine/RoutineCard.svelte';

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

<Floating>
  <FloatingButton text="Edit" icon="ph:note-pencil" href="/pet/{data.pet.id}/edit" />
  <FloatingButton
    text="Archive"
    icon="ph:archive"
    type="btn-error"
    href="/pet/{data.pet.id}/archive"
  />
</Floating>
