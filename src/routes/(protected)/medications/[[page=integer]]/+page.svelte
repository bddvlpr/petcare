<script lang="ts">
  import { page } from '$app/stores';
  import Icon from '@iconify/svelte';
  import type { PageData } from './$types';
  import Avatar from '$lib/components/content/Avatar.svelte';
  import Floating from '$lib/components/content/Floating.svelte';
  import FloatingButton from '$lib/components/content/FloatingButton.svelte';
  import { t } from '$lib/i18n';

  export let data: PageData;

  $: pages = Math.ceil(data.count / 10);
</script>

<h1 class="mb-4 text-center text-xl font-semibold text-primary">
  {$t('pages.medications.title')}
</h1>

<div class="m-2 flex flex-wrap justify-center gap-4">
  <div class="w-full overflow-x-auto">
    <table class="table">
      <thead>
        <tr>
          <th></th>
          <th>{$t('common.terms.picture')}</th>
          <th>{$t('common.terms.name')}</th>
          <th>{$t('common.terms.actions')}</th>
        </tr>
      </thead>
      <tbody>
        {#each data.medications as medication}
          <tr>
            <th>{medication.id}</th>
            <td>
              <div class="flex items-center gap-3">
                <Avatar alt={medication.name} src={medication.picture} size="w-12" type="rounded" />
              </div>
            </td>
            <td>{medication.name}</td>
            <td>
              <a class="btn btn-circle btn-ghost" href="/medication/{medication.id}">
                <Icon class="h-6 w-6" icon="ph:eye" />
              </a>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
<div class="flex items-center p-4">
  <div class="join mx-auto">
    {#each Array.from({ length: pages }, (_, i) => i + 1) as pagination}
      <a
        class="btn"
        class:join-item={pages > 1}
        class:btn-primary={pagination === (Number($page.params.page) || 1)}
        href="/medications/{pagination}"
      >
        {pagination}
      </a>
    {/each}
  </div>
</div>

<Floating>
  <FloatingButton text="Add" icon="ph:plus" type="btn-primary" href="/medications/add" />
</Floating>
