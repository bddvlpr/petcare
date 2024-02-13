import { deletePet } from '$lib/server/services/pets';
import { redirect, type Actions } from '@sveltejs/kit';

export const actions = {
  default: async ({ params }) => {
    const id = Number(params.id);

    await deletePet(id);

    return redirect(302, '/pets');
  }
} satisfies Actions;
