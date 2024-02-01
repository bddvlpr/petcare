<script lang="ts">
  import { dateProxy, superForm } from 'sveltekit-superforms/client';
  import type { PageData } from './$types';
  import Icon from '@iconify/svelte';
  import { PetType } from '@prisma/client';

  export let data: PageData;

  const { form, errors, enhance, message } = superForm(data.form);
  const proxyBirthday = dateProxy(form, 'birthday', { format: 'date' });
</script>

<form class="mx-auto max-w-sm md:max-w-lg" method="POST" use:enhance>
  <label class="form-control">
    <div class="label">
      <span class="label-text">Pet name</span>
    </div>
    <input
      class="input input-bordered"
      type="text"
      name="name"
      placeholder="Name"
      bind:value={$form.name}
    />
    {#if $errors.name}
      <div class="label">
        <span class="label-text-alt">{$errors.name}</span>
      </div>
    {/if}
  </label>

  <label class="form-control">
    <div class="label">
      <span class="label-text">Pet name</span>
    </div>
    <select class="select select-bordered" name="type" placeholder="Type" bind:value={$form.type}>
      {#each Object.keys(PetType) as type}
        <option>{type}</option>
      {/each}
    </select>
    {#if $errors.type}
      <div class="label">
        <span class="label-text-alt">{$errors.name}</span>
      </div>
    {/if}
  </label>

  <label class="form-control">
    <div class="label">
      <span class="label-text">Birthday</span>
    </div>
    <input
      class="input input-bordered"
      type="date"
      name="birthday"
      placeholder="Birthday"
      bind:value={$proxyBirthday}
    />
    {#if $errors.birthday}
      <div class="label">
        <span class="label-text-alt">{$errors.birthday}</span>
      </div>
    {/if}
  </label>

  <label class="form-control">
    <div class="label">
      <span class="label-text">Picture</span>
    </div>
    <input
      class="input input-bordered"
      type="text"
      name="picture"
      placeholder="Picture URL"
      bind:value={$form.picture}
    />
    {#if $errors.picture}
      <div class="label">
        <span class="label-text-alt">{$errors.picture}</span>
      </div>
    {/if}
  </label>

  <label class="form-control">
    <div class="label">
      <span class="label-text">Notes</span>
    </div>
    <textarea
      class="textarea textarea-bordered h-24"
      name="notes"
      placeholder="Notes"
      bind:value={$form.notes}
    ></textarea>
    {#if $errors.notes}
      <div class="label">
        <span class="label-text-alt">{$errors.notes}</span>
      </div>
    {/if}
  </label>

  <button class="btn btn-primary my-2 w-full">Submit</button>

  {#if $message}
    <div class="toast">
      <div
        class="alert"
        class:alert-success={$message.type === 'success'}
        class:alert-error={$message.type === 'error'}
      >
        <span>{$message.text}</span>
      </div>
    </div>
  {/if}

  <a href="/pets">
    <Icon class="inline-block" icon="ph:arrow-left" />
    <span class="link">Return to pets.</span>
  </a>
</form>
