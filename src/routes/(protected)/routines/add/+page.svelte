<script lang="ts">
  import { superForm } from 'sveltekit-superforms/client';
  import type { PageData } from './$types';
  import Icon from '@iconify/svelte';
  import Input from '$lib/components/form/Input.svelte';
  import Toast from '$lib/components/form/Toast.svelte';

  export let data: PageData;

  const { form, errors, enhance, message } = superForm(data.form);
</script>

<form class="mx-auto max-w-sm md:max-w-lg" method="POST" use:enhance>
  <Input
    name="petId"
    label="Pet"
    placeholder="..."
    type="select"
    bind:value={$form.petId}
    bind:error={$errors.petId}
  >
    {#each data.pets as pet}
      <option value={pet.id}>{pet.name} ({pet.id})</option>
    {/each}
  </Input>

  <Input
    name="medicationId"
    label="Medication"
    placeholder="..."
    type="select"
    bind:value={$form.medicationId}
    bind:error={$errors.medicationId}
  >
    {#each data.medications as medication}
      <option value={medication.id}>{medication.name} ({medication.id})</option>
    {/each}
  </Input>

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

  <a href="/routines">
    <Icon class="inline-block" icon="ph:arrow-left" />
    <span class="link">Return to routines.</span>
  </a>
</form>
