<script lang="ts">
  import type { Pet, Routine } from '@prisma/client';
  import Avatar from './Avatar.svelte';
  import { toLocaleDateString } from '$lib/date';
  import Icon from '@iconify/svelte';

  export let pet: Pet & { routines?: Routine[] };
</script>

<div class="card w-96 bg-base-200 shadow-xl">
  <div class="card-body">
    <div class="mb-2 flex items-center gap-4">
      <Avatar alt={pet.name} src={pet.picture} />
      <h2 class="card-title">
        {pet.name}
      </h2>
      <div class="card-actions ml-auto">
        <a class="btn btn-circle btn-primary" href="/pet/{pet.id}">
          <Icon class="h-6 w-6" icon="ph:eye" />
        </a>
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <div class="flex gap-2">
        <Icon class="h-6 w-6" icon="ph:fingerprint-fill" />
        <div class="self-center">
          <span class="mr-2 font-semibold"> Type </span>
          {pet.type}
        </div>
      </div>
      <div class="flex gap-2">
        <Icon class="h-6 w-6" icon="ph:cake-fill" />
        <div class="self-center">
          <span class="mr-2 font-semibold"> Birthday </span>
          {toLocaleDateString(pet.birthday)}
        </div>
      </div>
      {#if pet.routines}
        <div class="flex gap-2">
          <Icon class="h-6 w-6" icon="ph:pill-fill" />
          <div class="self-center">
            <span class="mr-2 font-semibold"> Routine(s) </span>
            {pet.routines.length}
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>
