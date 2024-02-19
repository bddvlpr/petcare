import { eq } from 'drizzle-orm';
import database from '../database';
import { routineLog, type NewRoutineLog } from '../database/schema';

export const getRoutineLogs = (routineId: number) =>
  database.query.routineLog.findMany({ where: eq(routineLog.routineId, routineId) });
export const getLastRoutineLog = (routineId: number) =>
  database.query.routineLog.findFirst({
    where: eq(routineLog.routineId, routineId),
    orderBy: (routineLog, { desc }) => [desc(routineLog.timestamp)]
  });

export const addRoutineLog = (data: NewRoutineLog) => database.insert(routineLog).values(data);

export const deleteRoutineLog = (id: number) =>
  database.delete(routineLog).where(eq(routineLog.id, id));
