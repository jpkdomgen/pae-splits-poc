import {
  char,
  date,
  decimal,
  integer,
  jsonb,
  numeric,
  pgTable,
  serial,
  smallint,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";


const commonFields = {
  // The date that the record in this table is effective from. This date defines the validity period for the rate category YYYY-MM-DD, ISO 8601
  validFrom: date("valid_from", { mode: "string" }),
  // The date that the record in this table is effective up to. This date defines the validity period for the  rate category YYYY-MM-DD, ISO 8601
  validTo: date("valid_to", { mode: "string" }),
  // Binary JSON array of the source files and data that populated or updated this row
  sourcData: jsonb("source_data"),
  // The datetime when the record was created
  createdAt: timestamp("created_at").notNull().defaultNow(),
  // The user id of the user (system or business user) who created the record
  createdBy: varchar("created_by", { length: 50 }).notNull(),
  // The datetime when the record was last updated
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  // The user id of the user (system or business user) who last updated the record
  updatedBy: varchar("updated_by", { length: 50 }).notNull(),
};

export const RefSplitType = pgTable("ref_split_type", {
  id: serial("id").primaryKey(),
  splitCode: varchar("split_code", {
    length: 50,
  }).notNull(),
  splitTypeKeyword: varchar("split_type_keyword", {
    length: 50,
  }).notNull(),
  splitDescription: varchar("description", { length: 200 }),
  splitSourceFrom: varchar("split_source_from", {
    length: 20,
  }),
  outputSplit: char("output_split", {
    length: 1,
  }).notNull(),
  ...commonFields,
});

export const RefSpltCategory = pgTable("ref_split_category", {
  id: serial("id").primaryKey(),
  categoryCode: varchar("category_code", {
    length: 5,
  }).notNull(),
  description: varchar("description", { length: 200 }),
  productVariantCode: varchar("product_variant_code", {
    length: 20,
  }).notNull(),
  productVariantVersion: varchar("product_variant_version", {
    length: 10,
  }).notNull(),
  channelCode: varchar("channel_code", {
    length: 5,
  }).notNull(),
  levelOfCoverCategoryCode: varchar("level_of_cover_category_code", {
    length: 5,
  }).notNull(),
  businessType: varchar("business_type", {
    length: 5,
  }).notNull(),
  ...commonFields,
});

export const RefSplitCategoryToSplitTypeMapping = pgTable(
  "ref_splits_category_to_split_type_mapping",
  {
    id: serial("id").primaryKey(),
    splitCode: varchar("split_code", {
      length: 50,
    }).notNull(),
    categoryCode: varchar("category_code", {
      length: 20,
    }).notNull(),
    splitOrder: integer("split_order").notNull(),
    dependentOn: varchar("dependent_on", { length: 255 }),
    ...commonFields,
  }
);

export const RefSplitCategoryToBaseRateMapping = pgTable(
  "ref_split_category_to_base_rate_mapping",
  {
    id: serial("id").primaryKey(),

    splitCategoryCode: varchar("split_category_code", {
      length: 20,
    }).notNull(),

    baseRateCategoryCode: varchar("base_rate_category_code", {
      length: 20,
    }).notNull(),
    ...commonFields,
  }
);

export const RefSplitVariantMaster = pgTable("ref_split_variant_master", {
  id: serial("id").primaryKey(),
  splitCode: varchar("split_type_code", {
    length: 50,
  }).notNull(),

  splitCategoryCode: varchar("split_category_code", {
    length: 20,
  }).notNull(),

  channelCode: varchar("channel_code", {
    length:10,
  }).notNull(),

  manufacturerBrandCode: varchar("manufacturer_brand_code", { length: 10 }),

  itemTypeCode: varchar("item_type_code", {
    length: 10,
  }).notNull(),

  itemOperationalStatus: varchar("item_operational_status", {
    enum: ["W", "N"],
  }),

  manufacturerGuaranteeInMonths: integer(
    "manufacturer_guarantee_in_months"
  ).notNull(),

  paymentMethod: varchar("payment_method", {
    enum: ["D", "C", "ACH"],
  }),

  periodOfCover: integer("period_of_cover").notNull(),
  itemAgeLimit: integer("item_age_limit").notNull(),
  itemPriceBand: decimal("item_price_band", {
    precision: 9,
    scale: 2,
  }).notNull(),

  calculationMethod: varchar("calculation_method", {
    length: 20,
  }),

  calcuationValue: decimal("calculation_value", {
    precision: 9,
    scale: 5,
  }).notNull(),

  renewalPhase: smallint("renewal_phase").notNull(),
  ...commonFields,
});

export const RefSplitsCalcualtionOverride = pgTable("split_calculation_override", {
  id: serial("id").primaryKey(),

  splitCode: varchar("split_type_code", {
    length: 50,
  }).notNull(),

  countryCode: varchar("country_code", {
    length: 5,
  })
    .notNull()
    .default("ANY"),

  regionOrStateCode: varchar("region_or_state_code", {
    length: 5,
  })
    .notNull()
    .default("ANY"),
  calculationMethod: varchar("calculation_method", {
    length: 20,
  }),

  calcuationValue: decimal("value", {
    precision: 9,
    scale: 5,
  }),

  formula: varchar("formula", { length: 255 }),

  roundingCalculation: varchar("rounding_calculation", {
    length: 2,
    enum: ["RU", "RD", "RH"],
  })
    .notNull()
    .default("RH"),

  ...commonFields,
});
