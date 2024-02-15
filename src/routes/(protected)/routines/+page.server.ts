import { getAllRoutines, getDueRoutines } from '$lib/server/services/routines';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  return {
    dueRoutines: await getDueRoutines(),
    routines: await getAllRoutines()
  };
};
