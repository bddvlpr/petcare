CREATE TABLE IF NOT EXISTS "medication" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"picture" varchar(1024),
	"notes" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pet" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"picture" varchar(1024),
	"notes" text,
	"birthday" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "routine" (
	"id" serial PRIMARY KEY NOT NULL,
	"amount" varchar(256) NOT NULL,
	"interval_days" integer NOT NULL,
	"interval_time" integer NOT NULL,
	"medication_id" integer NOT NULL,
	"pet_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "routine_log" (
	"id" serial PRIMARY KEY NOT NULL,
	"taken" boolean DEFAULT true NOT NULL,
	"timestamp" timestamp NOT NULL,
	"routine_id" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "routine" ADD CONSTRAINT "routine_medication_id_medication_id_fk" FOREIGN KEY ("medication_id") REFERENCES "medication"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "routine" ADD CONSTRAINT "routine_pet_id_pet_id_fk" FOREIGN KEY ("pet_id") REFERENCES "pet"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "routine_log" ADD CONSTRAINT "routine_log_routine_id_routine_id_fk" FOREIGN KEY ("routine_id") REFERENCES "routine"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
