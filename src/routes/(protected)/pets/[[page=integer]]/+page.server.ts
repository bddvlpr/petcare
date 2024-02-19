import { getPetCount, getPets } from '$lib/server/services/pets';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const page = Number(params.page ?? 1);

  const pets = await getPets((page - 1) * 10);
  const [{ count }] = await getPetCount();

  return {
    pets,
    count
  };
};
