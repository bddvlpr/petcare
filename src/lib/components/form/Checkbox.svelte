<script lang="ts">
  export let label: string;
  export let name: string;
  export let checked: boolean;
  export let error: unknown;
</script>

<label class="form-control">
  <div class="label">
    <span class="label-text">{label}</span>
    <input class="checkbox-primary checkbox" type="checkbox" {name} bind:checked />
  </div>
  {#if error}
    <div class="label">
      <span class="label-text-alt">{error}</span>
    </div>
  {/if}
</label>
