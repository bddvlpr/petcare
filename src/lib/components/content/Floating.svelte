<script lang="ts">
  export let offsetx = 'bottom-10';
  export let offsety = 'right-8';
</script>

<div class="fixed {offsetx} {offsety} flex gap-2">
  <slot />
</div>
