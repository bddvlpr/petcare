import prisma from '$lib/prisma';

export const getRoutineLogs = (routineId: number) =>
  prisma.routineLog.findMany({ where: { routineId } });
export const getLastRoutineLog = (routineId: number) =>
  prisma.routineLog.findFirst({ where: { routineId }, orderBy: { timestamp: 'desc' } });
