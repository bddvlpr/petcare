<script lang="ts">
  import Tooltip from '../content/Tooltip.svelte';

  export let tooltip: string;
  export let href: string | undefined = undefined;
</script>

<Tooltip text={tooltip} position="tooltip-bottom">
  {#if href}
    <a class="btn btn-circle btn-ghost" {href}>
      <slot />
    </a>
  {:else}
    <button class="btn btn-circle btn-ghost" on:click>
      <slot />
    </button>
  {/if}
</Tooltip>
