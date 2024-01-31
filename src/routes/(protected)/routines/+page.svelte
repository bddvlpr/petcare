<script lang="ts">
  import { page } from '$app/stores';
  import type { PageData } from './$types';

  export let data: PageData;

  $: pages = Math.ceil(data.count / 10);
</script>

{#each data.routines as routine}
  {routine.id}
{/each}
