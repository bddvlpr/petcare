import { count, eq } from 'drizzle-orm';
import database from '../database';
import { routine, type NewRoutine, type Routine } from '../database/schema';
import moment from 'moment';
import { getLastRoutineLog } from './routinelogs';

export const getAllRoutines = () =>
  database.query.routine.findMany({ with: { pet: true, medication: true } });
export const getRoutines = (offset: number, limit = 10) =>
  database.query.routine.findMany({ offset, limit });
export const getRoutineCount = () => database.select({ count: count() }).from(routine);
export const getRoutine = (id: number) =>
  database.query.routine.findFirst({
    where: eq(routine.id, id),
    with: {
      logs: { orderBy: (routine, { desc }) => [desc(routine.timestamp)] },
      pet: true,
      medication: true
    }
  });
export const getRoutinesByMedication = (medicationId: number) =>
  database.query.routine.findMany({
    where: eq(routine.medicationId, medicationId),
    with: { pet: true }
  });
export const getRoutinesByPet = (petId: number) =>
  database.query.routine.findMany({
    where: eq(routine.petId, petId),
    with: { medication: true }
  });

export const addRoutine = (data: NewRoutine) => database.insert(routine).values(data).returning();

export const updateRoutine = (id: number, data: Partial<Routine>) =>
  database.update(routine).set(data).where(eq(routine.id, id));

export const deleteRoutine = (id: number) => database.delete(routine).where(eq(routine.id, id));

export const getDueRoutines = async () => {
  const routines = await getAllRoutines();

  const filteredRoutines = await Promise.all(
    routines.map(async (routine) => {
      const lastLog = await getLastRoutineLog(routine.id);
      const due = moment(lastLog?.timestamp)
        .add(routine.intervalDays, 'days')
        .hours(0)
        .minutes(routine.intervalTime)
        .toDate();

      return {
        ...routine,
        lastLog,
        due
      };
    })
  );

  return filteredRoutines.filter(
    (routine) => !routine.lastLog || moment(routine.due).isBefore(moment())
  );
};
