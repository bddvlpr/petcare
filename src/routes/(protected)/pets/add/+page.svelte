<script lang="ts">
  import { dateProxy, superForm } from 'sveltekit-superforms/client';
  import type { PageData } from './$types';
  import Icon from '@iconify/svelte';
  import Input from '$lib/components/form/Input.svelte';
  import Toast from '$lib/components/form/Toast.svelte';

  export let data: PageData;

  const { form, errors, enhance, message } = superForm(data.form);
  const proxyBirthday = dateProxy(form, 'birthday', { format: 'date' });
</script>

<form class="mx-auto max-w-sm md:max-w-lg" method="POST" use:enhance>
  <Input
    name="name"
    label="Name"
    placeholder="Sylke"
    bind:value={$form.name}
    bind:error={$errors.name}
  />

  <Input
    name="birthday"
    label="Birthday"
    placeholder="..."
    type="date"
    bind:value={$proxyBirthday}
    bind:error={$errors.birthday}
  />

  <Input
    name="picture"
    label="Picture"
    placeholder="https://i.imgur.com/..."
    bind:value={$form.picture}
    bind:error={$errors.picture}
  />

  <Input
    name="notes"
    label="Notes"
    placeholder="Optional notes..."
    type="textarea"
    bind:value={$form.notes}
    bind:error={$errors.notes}
  />

  <button class="btn btn-primary my-2 w-full">Submit</button>

  <Toast message={$message} />

  <a href="/pets">
    <Icon class="inline-block" icon="ph:arrow-left" />
    <span class="link">Return to pets.</span>
  </a>
</form>
