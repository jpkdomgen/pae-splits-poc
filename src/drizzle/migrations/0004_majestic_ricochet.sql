CREATE TABLE IF NOT EXISTS "ref_splits_category_to_split_type_mapping" (
	"id" serial PRIMARY KEY NOT NULL,
	"split_code" varchar(5) NOT NULL,
	"category_code" varchar(5) NOT NULL,
	"split_order" integer NOT NULL,
	"dependent_on" varchar(255),
	"valid_from" date,
	"valid_to" date,
	"source_data" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"created_by" varchar(50) NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"updated_by" varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ref_split_category_to_base_rate_mapping" (
	"id" serial PRIMARY KEY NOT NULL,
	"split_category_code" varchar(5) NOT NULL,
	"base_rate_category_code" integer NOT NULL,
	"valid_from" date,
	"valid_to" date,
	"source_data" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"created_by" varchar(50) NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"updated_by" varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ref_split_variant_master" (
	"id" serial PRIMARY KEY NOT NULL,
	"split_type_code" varchar(5) NOT NULL,
	"split_category_code" varchar(5) NOT NULL,
	"channel_code" varchar(5) NOT NULL,
	"manufacturer_brand_code" varchar(10),
	"item_type_code" varchar(5) NOT NULL,
	"item_operational_status" varchar,
	"manufacturer_guarantee_in_months" integer NOT NULL,
	"payment_method" varchar,
	"period_of_cover" integer NOT NULL,
	"item_age_limit" integer NOT NULL,
	"item_price_band" numeric(9, 2) NOT NULL,
	"calculation_method" varchar(20),
	"calculation_value" numeric(9, 5) NOT NULL,
	"renewal_phase" smallint NOT NULL,
	"valid_from" date,
	"valid_to" date,
	"source_data" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"created_by" varchar(50) NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"updated_by" varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "split_calculation_override" (
	"id" serial PRIMARY KEY NOT NULL,
	"split_type_code" varchar(5) NOT NULL,
	"country_code" varchar(5) DEFAULT 'ANY' NOT NULL,
	"region_or_state_code" varchar(5) DEFAULT 'ANY' NOT NULL,
	"calculation_method" varchar(20),
	"value" numeric(9, 5) NOT NULL,
	"formula" varchar(255),
	"rounding_calculation" varchar(2) DEFAULT 'RH' NOT NULL,
	"valid_from" date,
	"valid_to" date,
	"source_data" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"created_by" varchar(50) NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"updated_by" varchar(50) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "ref_split_category" ADD COLUMN "category_code" varchar(5) NOT NULL;--> statement-breakpoint
ALTER TABLE "ref_split_category" DROP COLUMN IF EXISTS "categogy_code";