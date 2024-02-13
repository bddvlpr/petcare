import { message, superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import { getAllPets } from '$lib/server/services/pets';
import { getAllMedications } from '$lib/server/services/medications';
import { addRoutine } from '$lib/server/services/routines';
import { redirect } from '@sveltejs/kit';

const schema = z.object({
  petId: z.number().min(1, 'You must select a valid pet'),
  medicationId: z.number().min(1, 'You must select a valid medication'),
  amount: z.string().min(1),
  intervalDays: z.number().min(1),
  intervalTime: z
    .string()
    .regex(/^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/, 'You must select a valid time')
});

export const load: PageServerLoad = async () => {
  const form = await superValidate(schema);
  const pets = await getAllPets();
  const medications = await getAllMedications();

  return { form, pets, medications };
};

export const actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, schema);

    if (!form.valid) return message(form, { type: 'error', text: 'Form is not valid!' });

    const [hours, minutes] = form.data.intervalTime.split(':').map(Number);

    const routine = await addRoutine({
      ...form.data,
      intervalTime: hours * 60 + minutes
    });

    return redirect(302, `/routine/${routine.id}`);
  }
} satisfies Actions;
