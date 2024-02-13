import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { getRoutine } from '$lib/services/routines';

export const load: LayoutServerLoad = async ({ params }) => {
  const id = Number(params.id);
  const routine = await getRoutine(id);

  if (!routine) error(404);

  return { routine };
};
