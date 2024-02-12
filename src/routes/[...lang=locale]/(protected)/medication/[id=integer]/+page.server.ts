import { getRoutinesByMedication } from '$lib/services/routines';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const id = Number(params.id);

  const routines = await getRoutinesByMedication(id);

  return { routines };
};
