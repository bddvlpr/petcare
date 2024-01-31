import prisma from '$lib/prisma';

export const getMedications = (skip: number, take = 10) =>
  prisma.medication.findMany({ skip, take });
export const getMedicationCount = () => prisma.medication.count();
