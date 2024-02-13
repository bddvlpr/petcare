import prisma from '$lib/prisma';
import type { Prisma } from '@prisma/client';

export const getMedications = (skip: number, take = 10) =>
  prisma.medication.findMany({ skip, take });
export const getMedicationCount = () => prisma.medication.count();
export const getMedication = (id: number) => prisma.medication.findUnique({ where: { id } });
export const getAllMedications = () => prisma.medication.findMany();

export const addMedication = (data: Prisma.MedicationCreateInput) =>
  prisma.medication.create({ data });

export const updateMedication = (id: number, data: Prisma.MedicationUpdateInput) =>
  prisma.medication.update({ where: { id }, data });

export const deleteMedication = (id: number) => prisma.medication.delete({ where: { id } });
