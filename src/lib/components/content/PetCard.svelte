<script lang="ts">
  import type { Pet } from '@prisma/client';
  import Avatar from './Avatar.svelte';
  import { Cake, Clock, Eye, Fingerprint, Pill } from 'lucide-svelte';
  import { toLocalDateString } from '$lib/date';

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
          <Eye />
        </a>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-2">
      <div class="flex gap-2">
        <Cake />
        <span class="self-center">{toLocalDateString(pet.birthday)}</span>
      </div>
      <div class="flex gap-2">
        <Pill />
        <span class="self-center">0/4</span>
      </div>
      <div class="flex gap-2">
        <Clock />
        <span class="self-center">Yesterday</span>
      </div>
      <div class="flex gap-2">
        <Fingerprint />
        <span class="self-center">{pet.type}</span>
      </div>
    </div>
  </div>
</div>
