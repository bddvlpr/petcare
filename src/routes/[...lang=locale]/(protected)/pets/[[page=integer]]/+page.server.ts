import { getPetCount, getPets } from '$lib/services/pets';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const page = Number(params.page ?? 1);
  return {
    pets: await getPets((page - 1) * 10),
    count: await getPetCount()
  };
};
