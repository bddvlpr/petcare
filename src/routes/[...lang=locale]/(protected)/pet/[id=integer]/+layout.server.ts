import { getPet } from '$lib/services/pets';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params }) => {
  const id = Number(params.id);
  const pet = await getPet(id);

  if (!pet) throw error(404);

  return {
    pet
  };
};
