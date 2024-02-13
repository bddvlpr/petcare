<script lang="ts">
  export let text: string;
  export let position = '';
</script>

<div class="tooltip {position}" data-tip={text}>
  <slot />
</div>
