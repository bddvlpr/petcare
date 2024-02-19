import { getAllRoutines, getDueRoutines } from '$lib/server/services/routines';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  console.log(await getAllRoutines());
  return {
    routines: await getAllRoutines(),
    dueRoutines: await getDueRoutines()
  };
};
