import { getPet } from '$lib/services/pets';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const id = Number(params.id);
  return {
    pet: await getPet(id)
  };
};
