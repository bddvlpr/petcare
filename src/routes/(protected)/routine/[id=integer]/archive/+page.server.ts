import { deleteRoutine } from '$lib/services/routines';
import { redirect, type Actions } from '@sveltejs/kit';

export const actions = {
  default: async ({ params }) => {
    const id = Number(params.id);

    await deleteRoutine(id);

    return redirect(302, '/routines');
  }
} satisfies Actions;
