import { getCurrentRoutines } from '$lib/services/routines';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  return {
    routines: await getCurrentRoutines()
  };
};
