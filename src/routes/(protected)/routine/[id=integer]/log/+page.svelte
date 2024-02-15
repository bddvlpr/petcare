<script lang="ts">
  import Icon from '@iconify/svelte';
  import type { PageData } from './$types';
  import { dateProxy, superForm } from 'sveltekit-superforms/client';
  import Toast from '$lib/components/form/Toast.svelte';
  import Checkbox from '$lib/components/form/Checkbox.svelte';
  import Input from '$lib/components/form/Input.svelte';

  export let data: PageData;

  const { form, errors, enhance, message } = superForm(data.form);
  const proxyTimestamp = dateProxy(form, 'timestamp', { format: 'datetime-local' });
</script>

<form class="mx-auto max-w-sm md:max-w-lg" method="POST" use:enhance>
  <Input
    name="timestamp"
    label="Timestamp"
    placeholder="..."
    type="datetime-local"
    bind:value={$proxyTimestamp}
    bind:error={$errors.timestamp}
  />
  <Checkbox name="taken" label="Taken" bind:checked={$form.taken} bind:error={$errors.taken} />

  <button class="btn btn-primary my-2 w-full">Submit</button>

  <Toast message={$message} />

  <a href="/routine/{data.routine.id}">
    <Icon class="inline-block" icon="ph:arrow-left" />
    <span class="link">Return to routine page.</span>
  </a>
</form>
