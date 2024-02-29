<script lang="ts">
  import Icon from '@iconify/svelte';
  import type { PageData } from './$types';
  import Avatar from '$lib/components/content/Avatar.svelte';
  import { toLocaleString, toReadableHour } from '$lib/date';
  import FloatingButton from '$lib/components/content/FloatingButton.svelte';
  import Floating from '$lib/components/content/Floating.svelte';

  export let data: PageData;
</script>

<div>
  <div class="flex items-center">
    <div class="mr-auto">
      <h1 class="text-2xl font-bold text-primary">
        {data.routine.pet.name} ({data.routine.medication.name})
      </h1>
      {data.routine.logs.length} log(s)
    </div>

    <Avatar
      alt={data.routine.medication.name}
      src={data.routine.medication.picture}
      size="w-24"
      type="rounded"
    />
    <Avatar
      alt={data.routine.pet.name}
      src={data.routine.pet.picture}
      size="w-24 ml-2"
      type="rounded"
    />
  </div>
  <div class="divider"></div>

  <div class="my-2 flex items-center">
    <h2 class="text-2xl font-semibold">Details</h2>
    <a class="btn btn-circle btn-primary ml-auto" href="/routine/{data.routine.id}/edit">
      <Icon icon="ph:note-pencil" />
    </a>
  </div>
  <p>
    <a class="link link-primary" href="/pet/{data.routine.pet.id}">{data.routine.pet.name}</a>
    <b>{data.routine.intervalDays} day(s)</b>,
    <b>{data.routine.amount}</b>
    of
    <a class="link link-primary" href="/medication/{data.routine.medicationId}">
      {data.routine.medication.name}
    </a>
    at <b>{toReadableHour(data.routine.intervalTime)}</b>.
  </p>

  <div class="my-2 flex items-center">
    <h2 class="text-2xl font-semibold">Logs</h2>
    <a class="btn btn-circle btn-primary ml-auto" href="/routine/{data.routine.id}/add-log">
      <Icon icon="ph:plus" />
    </a>
  </div>
  <div class="overflow-x-auto">
    <table class="table table-zebra">
      <thead>
        <tr>
          <th></th>
          <th>Timestamp</th>
          <th>Taken</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {#each data.routine.logs as log, index}
          <tr>
            <th>{index + 1}</th>
            <td>{toLocaleString(log.timestamp)}</td>
            <td>
              {#if log.taken}
                <Icon class="h-6 w-6" icon="ph:check" />
              {:else}
                <Icon class="h-6 w-6" icon="ph:x" />
              {/if}
            </td>
            <td>
              <a
                class="btn btn-circle btn-ghost"
                href="/routine/{data.routine.id}/del-log/{log.id}"
              >
                <Icon class="h-6 w-6" icon="ph:trash" />
              </a>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<Floating>
  <FloatingButton text="Edit" icon="ph:note-pencil" href="/routine/{data.routine.id}/edit" />
  <FloatingButton
    text="Archive"
    icon="ph:archive"
    type="btn-error"
    href="/routine/{data.routine.id}/archive"
  />
</Floating>
