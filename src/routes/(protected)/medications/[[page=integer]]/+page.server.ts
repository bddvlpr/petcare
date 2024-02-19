import { getMedicationCount, getMedications } from '$lib/server/services/medications';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const page = Number(params.page ?? 1);

  const medications = await getMedications((page - 1) * 10);
  const [{ count }] = await getMedicationCount();

  return {
    medications,
    count
  };
};
