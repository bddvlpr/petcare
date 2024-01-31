import prisma from '$lib/prisma';

export const getRoutines = (skip: number, take = 10) => prisma.routine.findMany({ skip, take });
export const getRoutineCount = () => prisma.routine.count();

export const getCurrentRoutines = () => prisma.routine.findMany({});
