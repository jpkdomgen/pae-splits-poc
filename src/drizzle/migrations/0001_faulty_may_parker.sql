CREATE TABLE IF NOT EXISTS "ref_split_type" (
	"id" serial PRIMARY KEY NOT NULL,
	"split_code" varchar(5) NOT NULL,
	"split_type_keyword" varchar(5) NOT NULL,
	"description" varchar(80),
	"split_source_from" varchar(20),
	"output_split" varchar(1) NOT NULL,
	"effective_from" date,
	"effective_to" date,
	"source_data" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"created_by" varchar(50) NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"updated_by" varchar(50) NOT NULL
);
