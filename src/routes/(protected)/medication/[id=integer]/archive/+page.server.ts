import { deleteMedication } from '$lib/server/services/medications';
import { redirect, type Actions } from '@sveltejs/kit';

export const actions = {
  default: async ({ params }) => {
    const id = Number(params.id);

    await deleteMedication(id);

    return redirect(302, '/medications');
  }
} satisfies Actions;
