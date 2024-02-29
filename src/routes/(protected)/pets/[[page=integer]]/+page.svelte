<script lang="ts">
  import { page } from '$app/stores';
  import type { PageData } from './$types';
  import Floating from '$lib/components/content/Floating.svelte';
  import FloatingButton from '$lib/components/content/FloatingButton.svelte';
  import PetCard from '$lib/components/pet/PetCard.svelte';
  import { t } from '$lib/i18n';

  export let data: PageData;

  $: pages = Math.ceil(data.count / 10);
</script>

<h1 class="mb-4 text-center text-xl font-semibold text-primary">
  {$t('pages.pets.title')}
</h1>

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

<Floating>
  <FloatingButton text="Add" icon="ph:plus" type="btn-primary" href="/pets/add" />
</Floating>
