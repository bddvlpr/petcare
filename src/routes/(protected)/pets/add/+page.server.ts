import { message, superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import { redirect } from '@sveltejs/kit';
import { addPet } from '$lib/services/pets';
import { PetType } from '@prisma/client';

const schema = z.object({
  name: z.string().min(1),
  type: z.nativeEnum(PetType),
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

    await addPet(form.data);

    return redirect(302, '/pets');
  }
} satisfies Actions;
