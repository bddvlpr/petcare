import { getMedication } from '$lib/server/services/medications';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params }) => {
  const id = Number(params.id);
  const medication = await getMedication(id);

  if (!medication) error(404);

  return { medication };
};
