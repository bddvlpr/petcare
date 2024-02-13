import { getLastRoutineLog } from '$lib/services/routinelogs';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const id = Number(params.id);

  return {
    lastLog: await getLastRoutineLog(id)
  };
};
