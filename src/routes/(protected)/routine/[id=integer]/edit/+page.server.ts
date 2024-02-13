import { message, superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import type { Actions, PageServerLoad } from './$types';
import { toReadableHour } from '$lib/date';
import { updateRoutine } from '$lib/services/routines';

const schema = z.object({
  amount: z.string().min(1),
  intervalDays: z.number().min(1),
  intervalTime: z
    .string()
    .regex(/^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/, 'You must select a valid time')
});

export const load: PageServerLoad = async ({ parent }) => {
  const { routine } = await parent();
  const form = await superValidate(
    {
      ...routine,
      intervalTime: toReadableHour(routine?.intervalTime)
    },
    schema
  );
  return { form };
};

export const actions = {
  default: async ({ request, params }) => {
    const form = await superValidate(request, schema);

    if (!form.valid) return message(form, { type: 'error', text: 'Form is not valid!' });

    const [hours, minutes] = form.data.intervalTime.split(':').map(Number);

    await updateRoutine(Number(params.id), {
      ...form.data,
      intervalTime: hours * 60 + minutes
    });

    return message(form, { type: 'success', text: 'Saved!' });
  }
} satisfies Actions;
