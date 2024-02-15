import { deleteRoutineLog } from '$lib/server/services/routinelogs';
import { redirect, type Actions } from '@sveltejs/kit';

export const actions = {
  default: async ({ params }) => {
    const id = Number(params.logId);

    await deleteRoutineLog(id);

    return redirect(302, `/routine/${params.id}`);
  }
} satisfies Actions;
