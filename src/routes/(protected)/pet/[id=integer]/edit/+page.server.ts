import { message, superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { getPet, updatePet } from '$lib/services/pets';

const schema = z.object({
  name: z.string().min(1),
  birthday: z.date().optional().nullable(),
  picture: z.string().url().optional().nullable(),
  notes: z.string().optional().nullable()
});

export const load: PageServerLoad = async ({ params }) => {
  const pet = await getPet(Number(params.id));
  const form = await superValidate(pet, schema);
  return { form };
};

export const actions = {
  default: async ({ request, params }) => {
    const form = await superValidate(request, schema);

    if (!form.valid) return fail(400, { form });

    await updatePet(Number(params.id), form.data);

    return message(form, { type: 'success', text: 'Saved!' });
  }
} satisfies Actions;
