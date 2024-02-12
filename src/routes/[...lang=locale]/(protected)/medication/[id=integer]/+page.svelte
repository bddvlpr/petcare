<script lang="ts">
  import Avatar from '$lib/components/content/Avatar.svelte';
  import Icon from '@iconify/svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<div>
  <div class="flex items-center">
    <div class="mr-auto">
      <h1 class="text-2xl font-bold text-primary">
        {data.medication.name}
      </h1>
      {data.routines.length} routine(s)
    </div>

    <Avatar alt={data.medication.name} src={data.medication.picture} size="w-24" type="rounded" />
  </div>
  <div class="divider"></div>
  <h2 class="my-2 text-2xl font-semibold">Notes</h2>
  <p>
    {data.medication.notes ?? 'None'}
  </p>
  <h2 class="my-2 text-2xl font-semibold">Routines</h2>
  <div class="overflow-x-auto">
    <table class="table">
      <thead>
        <tr>
          <th></th>
          <th>Pet</th>
          <th>Amount</th>
          <th>Interval</th>
        </tr>
      </thead>
      <tbody>
        {#each data.routines as routine, i}
          <tr>
            <th>{i + 1}</th>
            <td>{routine.pet.name}</td>
            <td>{routine.amount}</td>
            <td>{routine.interval}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<div class="fixed bottom-10 right-8">
  <a class="btn btn-circle" href="/medication/{data.medication.id}/edit">
    <Icon class="h-6 w-6" icon="ph:note-pencil" />
  </a>
  <a class="btn btn-circle btn-error" href="/medication/{data.medication.id}/archive">
    <Icon class="h-6 w-6" icon="ph:archive" />
  </a>
</div>
