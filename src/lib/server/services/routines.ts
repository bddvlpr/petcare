import prisma from '$lib/server/prisma';
import type { Prisma } from '@prisma/client';
import { getLastRoutineLog } from './routinelogs';
import moment from 'moment';

export const getRoutines = (skip: number, take = 10) => prisma.routine.findMany({ skip, take });
export const getRoutineCount = () => prisma.routine.count();
export const getAllRoutines = () =>
  prisma.routine.findMany({ include: { pet: true, medication: true } });
export const getRoutine = (id: number) =>
  prisma.routine.findUnique({
    where: { id },
    include: { pet: true, medication: true, logs: true }
  });

export const getRoutinesByMedication = (medicationId: number) =>
  prisma.routine.findMany({ where: { medicationId }, include: { pet: true } });
export const getRoutinesByPet = (petId: number) =>
  prisma.routine.findMany({ where: { petId }, include: { medication: true } });

export const addRoutine = (data: Prisma.RoutineCreateInput | Prisma.RoutineUncheckedCreateInput) =>
  prisma.routine.create({ data });

export const updateRoutine = (id: number, data: Prisma.RoutineUpdateInput) =>
  prisma.routine.update({ where: { id }, data });

export const deleteRoutine = (id: number) => prisma.routine.delete({ where: { id } });

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
