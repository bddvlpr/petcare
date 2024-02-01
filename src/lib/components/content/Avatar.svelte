<script lang="ts">
  export let alt: string;
  export let src: string | null;
  export let size = 'w-16';
  export let type = 'rounded-full';

  let failed = false;
</script>

<div class="avatar placeholder">
  <div class="{size} {type} bg-neutral text-neutral-content">
    {#if src && !failed}
      <img {alt} {src} on:error={() => (failed = true)} />
    {:else}
      <span class="text-3xl">?</span>
    {/if}
  </div>
</div>
