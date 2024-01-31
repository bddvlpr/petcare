<script lang="ts">
  export let tooltip: string;
  export let href: string | undefined = undefined;
</script>

{#if href}
  <div class="tooltip tooltip-bottom" data-tip={tooltip}>
    <a class="btn btn-circle btn-ghost" {href}>
      <slot />
    </a>
  </div>
{:else}
  <div class="tooltip tooltip-bottom" data-tip={tooltip}>
    <button class="btn btn-circle btn-ghost" on:click>
      <slot />
    </button>
  </div>
{/if}
