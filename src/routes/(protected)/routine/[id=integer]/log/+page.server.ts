import { message, superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import type { Actions, PageServerLoad } from './$types';
import { addRoutineLog } from '$lib/server/services/routinelogs';
import { redirect } from '@sveltejs/kit';

const schema = z.object({
  timestamp: z.date(),
  taken: z.boolean()
});

export const load: PageServerLoad = async () => {
  const form = await superValidate(
    {
      timestamp: new Date(),
      taken: true
    },
    schema
  );
  return { form };
};

export const actions = {
  default: async ({ params, request }) => {
    const routineId = Number(params.id);
    const form = await superValidate(request, schema);

    if (!form.valid) return message(form, { type: 'error', text: 'Form is not valid!' });

    await addRoutineLog({
      routineId,
      ...form.data
    });

    return redirect(302, `/routine/${routineId}`);
  }
} satisfies Actions;
