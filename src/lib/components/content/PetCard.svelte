<script lang="ts">
  import type { Pet } from '@prisma/client';
  import Avatar from './Avatar.svelte';
  import { toLocalDateString } from '$lib/date';
  import Icon from '@iconify/svelte';

  export let pet: Pet;
</script>

<div class="card w-96 bg-base-100 shadow-xl">
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
    <div class="grid grid-cols-2 gap-2">
      <div class="flex gap-2">
        <Icon class="h-6 w-6" icon="ph:cake-fill" />
        <span class="self-center">{toLocalDateString(pet.birthday)}</span>
      </div>
      <div class="flex gap-2">
        <Icon class="h-6 w-6" icon="ph:pill-fill" />
        <span class="self-center">0/4</span>
      </div>
      <div class="flex gap-2">
        <Icon class="h-6 w-6" icon="ph:clock-clockwise-fill" />
        <span class="self-center">Yesterday</span>
      </div>
      <div class="flex gap-2">
        <Icon class="h-6 w-6" icon="ph:fingerprint-fill" />
        <span class="self-center">{pet.type}</span>
      </div>
    </div>
  </div>
</div>
