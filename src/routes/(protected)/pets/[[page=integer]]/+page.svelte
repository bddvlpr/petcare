<script lang="ts">
  import { page } from '$app/stores';
  import PetCard from '$lib/components/content/PetCard.svelte';
  import Icon from '@iconify/svelte';
  import type { PageData } from './$types';
  import Tooltip from '$lib/components/content/Tooltip.svelte';

  export let data: PageData;

  $: pages = Math.ceil(data.count / 10);
</script>

<h1 class="mb-4 text-center text-xl font-semibold text-primary">Pets</h1>

<div class="m-2 flex flex-wrap justify-center gap-4">
  {#each data.pets as pet}
    <PetCard {pet} />
  {/each}
</div>
<div class="flex items-center p-4">
  <div class="join mx-auto">
    {#each Array.from({ length: pages }, (_, i) => i + 1) as pagination}
      <a
        class="btn"
        class:join-item={pages > 1}
        class:btn-primary={pagination === (Number($page.params.page) || 1)}
        href="/pets/{pagination}"
      >
        {pagination}
      </a>
    {/each}
  </div>
</div>

<div class="fixed bottom-10 right-8">
  <Tooltip text="Add">
    <a class="btn btn-circle btn-primary" href="/pets/add">
      <Icon class="h-6 w-6" icon="ph:plus" />
    </a>
  </Tooltip>
</div>
