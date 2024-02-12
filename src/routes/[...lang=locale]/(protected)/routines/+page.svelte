<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

{#each data.routines as routine}
  {routine.id}
{/each}
