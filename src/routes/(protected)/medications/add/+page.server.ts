import { message, superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import { redirect } from '@sveltejs/kit';
import { addMedication } from '$lib/server/services/medications';

const schema = z.object({
  name: z.string().min(1),
  picture: z.string().url().optional().nullable(),
  notes: z.string().optional().nullable()
});

export const load: PageServerLoad = async () => {
  const form = await superValidate(schema);

  return { form };
};

export const actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, schema);
    if (!form.valid) return message(form, { type: 'error', text: 'Form is not valid!' });

    const [medication = null] = await addMedication(form.data);
    if (!medication) return message(form, { type: 'error', text: 'Could not add this object!' });

    return redirect(302, `/medication/${medication.id}`);
  }
} satisfies Actions;
