<script lang="ts">
  import { toReadableHour } from '$lib/date';
  import type { Medication, Pet, Routine } from '$lib/server/database/schema';
  import Icon from '@iconify/svelte';

  export let routine: Routine & { medication: Medication; pet: Pet };
</script>

<div class="card min-w-96 bg-base-200">
  <div class="card-body">
    <p class="card-title">
      Every {routine.intervalDays} days at {toReadableHour(routine.intervalTime)}
    </p>
    <div class="grid grid-cols-2 gap-2">
      <div class="flex gap-2">
        <Icon class="h-6 w-6" icon="ph:paw-print-fill" />
        <a class="link link-primary self-center" href="/pet/{routine.petId}">
          {routine.pet.name}
        </a>
      </div>
      <div class="flex gap-2">
        <Icon class="h-6 w-6" icon="ph:pill-fill" />
        <a class="link link-primary self-center" href="/medication/{routine.medicationId}">
          {routine.medication.name}
        </a>
      </div>
      <div class="flex gap-2">
        <Icon class="h-6 w-6" icon="ph:scales-fill" />
        <span class="self-center">{routine.amount}</span>
      </div>
    </div>
    <div class="card-actions mt-2">
      <a class="btn btn-primary w-full" href="/routine/{routine.id}"> View </a>
    </div>
  </div>
</div>
