<script lang="ts">
  export let label: string;
  export let name: string;
  export let placeholder: string;
  export let type: 'text' | 'textarea' | 'select' | 'date' = 'text';
  export let value: unknown;
  export let error: unknown;
</script>

<label class="form-control">
  <div class="label">
    <span class="label-text">{label}</span>
  </div>
  {#if type === 'textarea'}
    <textarea class="textarea textarea-bordered h-24" {name} {placeholder} bind:value />
  {:else if type === 'select'}
    <select class="select select-bordered" {name} {placeholder} bind:value>
      <slot />
    </select>
  {:else if type === 'date'}
    <input class="input input-bordered" type="date" {name} {placeholder} bind:value />
  {:else}
    <input class="input input-bordered" type="text" {name} {placeholder} bind:value />
  {/if}
  {#if error}
    <div class="label">
      <span class="label-text-alt">{error}</span>
    </div>
  {/if}
</label>
