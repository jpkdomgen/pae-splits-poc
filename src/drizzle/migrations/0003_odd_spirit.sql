CREATE TABLE IF NOT EXISTS "ref_split_category" (
	"id" serial PRIMARY KEY NOT NULL,
	"categogy_code" varchar(5) NOT NULL,
	"description" varchar(200),
	"product_variant_code" varchar(20) NOT NULL,
	"product_variant_version" varchar(10) NOT NULL,
	"channel_code" varchar(5) NOT NULL,
	"level_of_cover_category_code" varchar(5) NOT NULL,
	"valid_from" date,
	"valid_to" date,
	"source_data" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"created_by" varchar(50) NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"updated_by" varchar(50) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "ref_split_type" ALTER COLUMN "description" SET DATA TYPE varchar(200);--> statement-breakpoint
ALTER TABLE "ref_split_type" ADD COLUMN "valid_from" date;--> statement-breakpoint
ALTER TABLE "ref_split_type" ADD COLUMN "valid_to" date;--> statement-breakpoint
ALTER TABLE "ref_split_type" DROP COLUMN IF EXISTS "effective_from";--> statement-breakpoint
ALTER TABLE "ref_split_type" DROP COLUMN IF EXISTS "effective_to";