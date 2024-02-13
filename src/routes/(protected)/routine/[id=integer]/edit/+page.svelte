<script lang="ts">
  import Icon from '@iconify/svelte';
  import type { PageData } from './$types';
  import { superForm } from 'sveltekit-superforms/client';
  import Input from '$lib/components/form/Input.svelte';
  import Toast from '$lib/components/form/Toast.svelte';

  export let data: PageData;

  const { form, errors, enhance, message } = superForm(data.form);
</script>

<form class="mx-auto max-w-sm md:max-w-lg" method="POST" use:enhance>
  <Input
    name="amount"
    label="Amount"
    placeholder="1/4"
    bind:value={$form.amount}
    bind:error={$errors.amount}
  />

  <Input
    name="intervalDays"
    label="Interval days"
    placeholder="2"
    type="number"
    bind:value={$form.intervalDays}
    bind:error={$errors.intervalDays}
  />

  <Input
    name="intervalTime"
    label="Interval time (minutes)"
    placeholder="2"
    type="time"
    bind:value={$form.intervalTime}
    bind:error={$errors.intervalTime}
  />

  <button class="btn btn-primary my-2 w-full">Submit</button>

  <Toast message={$message} />

  <a href="/routine/{data.routine.id}">
    <Icon class="inline-block" icon="ph:arrow-left" />
    <span class="link">Return to routine page.</span>
  </a>
</form>
