import { message, superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import type { Actions, PageServerLoad } from './$types';
import { getMedication, updateMedication } from '$lib/services/medications';

const schema = z.object({
  name: z.string().min(1),
  picture: z.string().url().optional().nullable(),
  notes: z.string().optional().nullable()
});

export const load: PageServerLoad = async ({ params }) => {
  const medication = await getMedication(Number(params.id));
  const form = await superValidate(medication, schema);
  return { form };
};

export const actions = {
  default: async ({ request, params }) => {
    const form = await superValidate(request, schema);

    if (!form.valid) return message(form, { type: 'error', text: 'Form is not valid!' });

    await updateMedication(Number(params.id), form.data);

    return message(form, { type: 'success', text: 'Saved!' });
  }
} satisfies Actions;
