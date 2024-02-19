import { message, superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import { redirect } from '@sveltejs/kit';
import { addPet } from '$lib/server/services/pets';

const schema = z.object({
  name: z.string().min(1),
  birthday: z.date().max(new Date(), 'Must be before today').optional().nullable(),
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

    const [pet = null] = await addPet(form.data);
    if (!pet) return message(form, { type: 'error', text: 'Could not add this object!' });

    return redirect(302, `/pet/${pet.id}`);
  }
} satisfies Actions;
