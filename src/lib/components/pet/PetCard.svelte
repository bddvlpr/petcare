<script lang="ts">
  import { toLocaleDateString } from '$lib/date';
  import Icon from '@iconify/svelte';
  import type { Pet } from '$lib/server/database/schema';
  import Avatar from '../content/Avatar.svelte';
  import { t } from '$lib/i18n';

  export let pet: Pet;
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
        <Icon class="h-6 w-6" icon="ph:cake-fill" />
        <div class="self-center">
          <span class="mr-2 font-semibold"> {$t('common.terms.birthday')} </span>
          {toLocaleDateString(pet.birthday)}
        </div>
      </div>
    </div>
  </div>
</div>
