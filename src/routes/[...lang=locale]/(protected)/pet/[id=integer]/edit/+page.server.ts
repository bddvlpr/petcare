import { message, superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import type { Actions, PageServerLoad } from './$types';
import { getPet, updatePet } from '$lib/services/pets';
import { PetType } from '@prisma/client';

const schema = z.object({
  name: z.string().min(1),
  type: z.nativeEnum(PetType),
  birthday: z.date().max(new Date(), 'Must be before today').optional().nullable(),
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

    if (!form.valid) return message(form, { type: 'error', text: 'Form is not valid!' });

    await updatePet(Number(params.id), form.data);

    return message(form, { type: 'success', text: 'Saved!' });
  }
} satisfies Actions;
