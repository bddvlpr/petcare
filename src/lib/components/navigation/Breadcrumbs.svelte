<script lang="ts">
  import { page } from '$app/stores';

  let crumbs: { label: string; href: string }[] = [];

  $: {
    const tokens = $page.url.pathname.split('/').filter((t) => t !== '');
    let tokenPath = '';
    crumbs = tokens.map((t) => {
      tokenPath += '/' + t;
      t = t.charAt(0).toUpperCase() + t.slice(1);
      return { label: t, href: tokenPath };
    });
  }
</script>

<div class="text-md breadcrumbs">
  <ul>
    {#each crumbs as { label, href }}
      <li><a {href}>{label}</a></li>
    {/each}
  </ul>
</div>
