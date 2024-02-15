import prisma from '$lib/server/prisma';
import type { Prisma } from '@prisma/client';

export const getRoutineLogs = (routineId: number) =>
  prisma.routineLog.findMany({ where: { routineId } });
export const getLastRoutineLog = (routineId: number) =>
  prisma.routineLog.findFirst({ where: { routineId }, orderBy: { timestamp: 'desc' } });

export const addRoutineLog = (
  data: Prisma.RoutineLogCreateInput | Prisma.RoutineLogUncheckedCreateInput
) => prisma.routineLog.create({ data });
