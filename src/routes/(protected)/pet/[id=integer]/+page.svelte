<script lang="ts">
  import Icon from '@iconify/svelte';
  import type { PageData } from './$types';
  import Avatar from '$lib/components/content/Avatar.svelte';

  export let data: PageData;
</script>

<div>
  <div class="flex items-center">
    <div>
      <h1 class="text-4xl font-bold text-primary">
        {data.pet.name}
      </h1>
      <div class="badge badge-neutral mt-2">
        {data.pet.type}
      </div>
    </div>

    <a class="btn btn-circle mx-2 ml-auto" href="/pet/{data.pet.id}/edit">
      <Icon class="h-6 w-6" icon="ph:note-pencil" />
    </a>
    <a class="btn btn-circle btn-error mr-4" href="/pet/{data.pet.id}/archive">
      <Icon class="h-6 w-6" icon="ph:archive" />
    </a>
    <Avatar alt={data.pet.name} src={data.pet.picture} size="w-24" type="rounded" />
  </div>
  <div class="divider"></div>
  <h2 class="text-2xl font-semibold">Routines</h2>
</div>
