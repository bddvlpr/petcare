import { message, superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import { fail, redirect } from '@sveltejs/kit';
import { addMedication } from '$lib/services/medications';

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

    if (!form.valid) return fail(400, { form });

    await addMedication(form.data);

    return redirect(302, '/medications');
  }
} satisfies Actions;
