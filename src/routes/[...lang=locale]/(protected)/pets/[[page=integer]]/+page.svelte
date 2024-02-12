<script lang="ts">
  import { page } from '$app/stores';
  import PetCard from '$lib/components/content/PetCard.svelte';
  import Icon from '@iconify/svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  $: pages = Math.ceil(data.count / 10);
</script>

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
  <a class="btn btn-circle btn-primary" href="/pets/add">
    <Icon class="h-6 w-6" icon="ph:plus" />
  </a>
</div>
