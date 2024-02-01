import prisma from '$lib/prisma';
import type { Prisma } from '@prisma/client';

export const getPets = (skip: number, take = 10) => prisma.pet.findMany({ skip, take });
export const getPetCount = () => prisma.pet.count();
export const getPet = (id: number) => prisma.pet.findUnique({ where: { id } });

export const addPet = (data: Prisma.PetCreateInput) => prisma.pet.create({ data });

export const updatePet = (id: number, data: Prisma.PetUpdateInput) =>
  prisma.pet.update({ where: { id }, data });

export const deletePet = (id: number) => prisma.pet.delete({ where: { id } });
