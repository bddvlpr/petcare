import { getRoutinesByMedication } from '$lib/services/routines';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const id = Number(params.id);

  return { routines: await getRoutinesByMedication(id) };
};