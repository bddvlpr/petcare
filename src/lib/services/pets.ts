import prisma from '$lib/prisma';

export const getPets = (skip: number, take = 10) => prisma.pet.findMany({ skip, take });
export const getPetCount = () => prisma.pet.count();
export const getPet = (id: number) => prisma.pet.findUnique({ where: { id } });
