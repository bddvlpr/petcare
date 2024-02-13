<script lang="ts">
  import Icon from '@iconify/svelte';
  import type { PageData } from './$types';
  import Tooltip from '$lib/components/content/Tooltip.svelte';

  export let data: PageData;
</script>

<div class="fixed bottom-10 right-8">
  <Tooltip text="Edit">
    <a class="btn btn-circle" href="/routine/{data.routine.id}/edit">
      <Icon class="h-6 w-6" icon="ph:note-pencil" />
    </a>
  </Tooltip>

  <Tooltip text="Add">
    <a class="btn btn-circle btn-error" href="/routine/{data.routine.id}/archive">
      <Icon class="h-6 w-6" icon="ph:archive" />
    </a>
  </Tooltip>
</div>
