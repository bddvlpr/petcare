import { count, eq } from 'drizzle-orm';
import database from '../database';
import { pet, type NewPet, type Pet } from '../database/schema';

export const getAllPets = () => database.query.pet.findMany();
export const getPets = (offset: number, limit = 10) =>
  database.query.pet.findMany({ offset, limit });
export const getPetCount = () => database.select({ count: count() }).from(pet);
export const getPet = (id: number) => database.query.pet.findFirst({ where: eq(pet.id, id) });

export const addPet = (data: NewPet) => database.insert(pet).values(data).returning();

export const updatePet = (id: number, data: Partial<Pet>) =>
  database.update(pet).set(data).where(eq(pet.id, id));

export const deletePet = (id: number) => database.delete(pet).where(eq(pet.id, id));
