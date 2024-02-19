import { relations } from 'drizzle-orm';
import { boolean, integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const pet = pgTable('pet', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  picture: varchar('picture', { length: 1024 }),
  notes: text('notes'),
  birthday: timestamp('birthday')
});

export const petRelations = relations(pet, ({ many }) => ({
  routines: many(routine)
}));

export type Pet = typeof pet.$inferSelect;
export type NewPet = typeof pet.$inferInsert;

export const medication = pgTable('medication', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  picture: varchar('picture', { length: 1024 }),
  notes: text('notes')
});

export const medicationRelations = relations(medication, ({ many }) => ({
  routines: many(routine)
}));

export type Medication = typeof medication.$inferSelect;
export type NewMedication = typeof medication.$inferInsert;

export const routine = pgTable('routine', {
  id: serial('id').primaryKey(),
  amount: varchar('amount', { length: 256 }).notNull(),
  intervalDays: integer('interval_days').notNull(),
  intervalTime: integer('interval_time').notNull(),
  medicationId: integer('medication_id')
    .references(() => medication.id, { onDelete: 'cascade' })
    .notNull(),
  petId: integer('pet_id')
    .references(() => pet.id, { onDelete: 'cascade' })
    .notNull()
});

export const routineRelations = relations(routine, ({ one, many }) => ({
  logs: many(routineLog),
  medication: one(medication, {
    fields: [routine.medicationId],
    references: [medication.id]
  }),
  pet: one(pet, {
    fields: [routine.petId],
    references: [pet.id]
  })
}));

export type Routine = typeof routine.$inferSelect;
export type NewRoutine = typeof routine.$inferInsert;

export const routineLog = pgTable('routine_log', {
  id: serial('id').primaryKey(),
  taken: boolean('taken').default(true).notNull(),
  timestamp: timestamp('timestamp').notNull(),
  routineId: integer('routine_id')
    .references(() => routine.id, { onDelete: 'cascade' })
    .notNull()
});

export const routineLogRelations = relations(routineLog, ({ one }) => ({
  routine: one(routine, {
    fields: [routineLog.routineId],
    references: [routine.id]
  })
}));

export type RoutineLog = typeof routineLog.$inferSelect;
export type NewRoutineLog = typeof routineLog.$inferInsert;
