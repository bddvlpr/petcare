<script lang="ts">
  import { page } from '$app/stores';
  import type { PageData } from './$types';

  export let data: PageData;

  $: pages = Math.ceil(data.count / 10);
</script>

<div class="m-2 flex flex-wrap justify-center gap-4">
  <div class="overflow-x-auto">
    <table class="table">
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {#each data.medications as medication}
          <tr>
            <th>{medication.id}</th>
            <td>{medication.name}</td>
            <td>{medication.notes ?? 'None'}</td>
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
