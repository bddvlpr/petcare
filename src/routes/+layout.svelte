<script lang="ts">
  import '../app.pcss';
  import NavBar from '$lib/components/navigation/NavBar.svelte';
</script>

<NavBar />

<div class="p-4">
  <slot />
</div>
