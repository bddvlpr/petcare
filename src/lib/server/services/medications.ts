import { count, eq } from 'drizzle-orm';
import database from '../database';
import { medication, type Medication, type NewMedication } from '../database/schema';

export const getAllMedications = () => database.query.medication.findMany();
export const getMedications = (offset: number, limit = 10) =>
  database.query.medication.findMany({ offset, limit });
export const getMedicationCount = () => database.select({ count: count() }).from(medication);
export const getMedication = (id: number) =>
  database.query.medication.findFirst({ where: eq(medication.id, id) });

export const addMedication = (data: NewMedication) =>
  database.insert(medication).values(data).returning();

export const updateMedication = (id: number, data: Partial<Medication>) =>
  database.update(medication).set(data).where(eq(medication.id, id)).returning();

export const deleteMedication = (id: number) =>
  database.delete(medication).where(eq(medication.id, id)).returning();
