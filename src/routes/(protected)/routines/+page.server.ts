import { getDueRoutines } from '$lib/services/routines';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  return {
    dueRoutines: await getDueRoutines()
  };
};
