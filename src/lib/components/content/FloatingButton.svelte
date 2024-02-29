<script lang="ts">
  import Icon from '@iconify/svelte';
  import Tooltip from './Tooltip.svelte';

  export let text: string;
  export let href: string;
  export let icon: string;
  export let type = '';
</script>

<Tooltip {text}>
  <a class="btn btn-circle {type}" {href}>
    <Icon class="h-6 w-6" {icon} />
  </a>
</Tooltip>
