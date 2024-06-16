import { db, sqlClient } from "../src/drizzle/db";
import {
  RefSplitType,
  RefSpltCategory,
  RefSplitCategoryToSplitTypeMapping,
  RefSplitCategoryToBaseRateMapping,
  RefSplitVariantMaster,
  RefSplitsCalcualtionOverride,
} from "../src/drizzle/schema";
import readXlsxFile from "read-excel-file/node";

const splitsReferenceDataFilePath = "./data/splits-reference-data.xlsx";

async function loadSplitTypedata(filePath: string, sheetName: any) {
  const splitsTypeSchema = {
    SPLIT_CODE: {
      prop: "splitCode",
    },
    SPLIT_TYPE_KEYWORD: {
      prop: "splitTypeKeyWord",
    },
    SPLIT_DESCRIPTION: {
      prop: "splitDescription",
    },
    SPLIT_SOURCE_FROM: {
      prop: "splitSourceFrom",
    },
    SOURCE_DATA: {
      prop: "sourceData",
    },
    OUTPUT_SPLIT: {
      prop: "outputSplit",
    },
    VALID_FROM: {
      prop: "validFrom",
    },
    VALID_TO: {
      prop: "validTo",
    },
  };

  readXlsxFile(filePath, { schema: splitsTypeSchema, sheet: sheetName }).then(
    ({ rows, errors }) => {
      if (errors.length === 0) {
        rows.forEach((row: any) => {
          (async () => {
            await db.insert(RefSplitType).values({
              splitCode: row["splitCode"],
              splitTypeKeyword: row["splitTypeKeyWord"],
              splitDescription: row["splitDescription"],
              outputSplit: row["outputSplit"],
              createdBy: "test",
              updatedBy: "test",
            });
          })();
        });
      }
    }
  );

  const splitData = await db.select().from(RefSplitType);
  console.log(splitData);
}

async function loadSplitsCategory(filePath: string, sheetName: any) {
  const splitsTypeSchema = {
    CATEGORY_CODE: {
      prop: "categoryCode",
    },
    DESCRIPTION: {
      prop: "description",
    },
    PRODUCT_VARIANT_CODE: {
      prop: "productVariantCode",
    },
    PRODUCT_VARIANT_VERSION: {
      prop: "productVariantVersion",
    },
    CHANNEL_CODE: {
      prop: "channelCode",
    },
    LEVEL_OF_COVER_CATEGORY_CODE: {
      prop: "levelOfCoverCategoryCode",
    },
    BUSINESS_TYPE: {
      prop: "businessType",
    },
  };

  readXlsxFile(filePath, { schema: splitsTypeSchema, sheet: sheetName }).then(
    ({ rows, errors }) => {
      console.log(rows);
      if (errors.length === 0) {
        rows.forEach((row: any) => {
          (async () => {
            await db.insert(RefSpltCategory).values({
              categoryCode: row["splitCode"],
              description: row["description"],
              productVariantCode: row["productVariantCode"],
              productVariantVersion: row["productVariantVersion"],
              channelCode: row["channelCode"],
              levelOfCoverCategoryCode: row["levelOfCoverCategoryCode"],
              businessType: row["businessType"],
              createdBy: "test",
              updatedBy: "test",
            });
          })();
        });
      }
    }
  );

  const splitData = await db.select().from(RefSpltCategory);
  console.log(splitData);
}

async function loadRefSplitCategoryToSplitTypeMapping(
  filePath: string,
  sheetName: any
) {
  const splitsTypeSchema = {
    SPLIT_TYPE_CODE: {
      prop: "splitCode",
    },
    SPLIT_CATEGORY_CODE: {
      prop: "categoryCode",
    },
    SPLIT_ORDER: {
      prop: "splitOrder",
    },
    DEPENDENT_ON: {
      prop: "dependentOn",
    },
  };

  readXlsxFile(filePath, { schema: splitsTypeSchema, sheet: sheetName }).then(
    ({ rows, errors }) => {
      if (errors.length === 0) {
        rows.forEach((row: any) => {
          (async () => {
            await db.insert(RefSplitCategoryToSplitTypeMapping).values({
              splitCode: row["splitCode"],
              categoryCode: row["categoryCode"],
              splitOrder: row["splitOrder"],
              dependentOn: row["dependentOn"],
              createdBy: "test",
              updatedBy: "test",
            });
          })();
        });
      }
    }
  );

  const splitData = await db.select().from(RefSplitCategoryToSplitTypeMapping);
  console.log(splitData);
}

async function loadrefSplitCategoryToBaseRateMapping(
  filePath: string,
  sheetName: any
) {
  const splitsTypeSchema = {
    SPLIT_CATEGORY_CODE: {
      prop: "splitCategoryCode",
    },
    BASE_RATE_CATEGORY_CODE: {
      prop: "baseRateCategoryCode",
    },
  };

  readXlsxFile(filePath, { schema: splitsTypeSchema, sheet: sheetName }).then(
    ({ rows, errors }) => {
      console.log(rows);
      if (errors.length === 0) {
        rows.forEach((row: any) => {
          (async () => {
            await db.insert(RefSplitCategoryToBaseRateMapping).values({
              baseRateCategoryCode: row["baseRateCategoryCode"],
              splitCategoryCode: row["splitCategoryCode"],
              createdBy: "test",
              updatedBy: "test",
            });
          })();
        });
      }
    }
  );

  const splitData = await db.select().from(RefSplitCategoryToBaseRateMapping);
  console.log(splitData);
}

async function loadRefSplitVariantMaster(filePath: string, sheetName: any) {
  const splitsTypeSchema = {
    SPLIT_TYPE_CODE: {
      prop: "splitCode",
    },
    SPLIT_CATEGORY_CODE: {
      prop: "splitCategoryCode",
    },
    CHANNEL_CODE: {
      prop: "channelCode",
    },
    MANUFACTURER_BRAND_CODE: {
      prop: "manufacturerBrandCode",
    },
    ITEM_TYPE_CODE: {
      prop: "itemTypeCode",
    },
    ITEM_OPERATION_STATUS: {
      prop: "itemOperationalStatus",
    },
    MANUFACTURER_GUARANTEE: {
      prop: "manufacturerGuaranteeInMonths",
    },
    PAYMENT_METHOD: {
      prop: "paymentMethod",
    },
    PERIOD_OF_COVER: {
      prop: "periodOfCover",
    },
    ITEM_AGE_LIMIT: {
      prop: "itemAgeLimit",
    },
    ITEM_PRICE_BAND: {
      prop: "itemPriceBand",
    },
    CALCULATION_METHOD: {
      prop: "calculationMethod",
    },

    CACULATION_VALUE: {
      prop: "calcuationValue",
    },
    CALCULATION_PERCENTAGE: {
      prop: "baseRateCategoryCode",
    },

    RENEWAL_PHASE: {
      prop: "renewalPhase",
    },
  };

  readXlsxFile(filePath, { schema: splitsTypeSchema, sheet: sheetName }).then(
    ({ rows, errors }) => {
      console.log(rows);
      if (errors.length === 0) {
        rows.forEach((row: any) => {
          (async () => {
            await db.insert(RefSplitVariantMaster).values({
              splitCode: row["splitCode"],
              splitCategoryCode: row["splitCategoryCode"],
              channelCode: row["channelCode"],
              manufacturerBrandCode: row["manufacturerBrandCode"],
              itemTypeCode: row["itemTypeCode"],
              itemOperationalStatus: row["itemOperationalStatus"],
              manufacturerGuaranteeInMonths:
                row["manufacturerGuaranteeInMonths"],
              paymentMethod: row["paymentMethod"],
              periodOfCover: row["periodOfCover"],
              itemAgeLimit: row["itemAgeLimit"],
              itemPriceBand: row["itemPriceBand"],
              calculationMethod: row["calculationMethod"],
              calcuationValue: row["calcuationValue"],
              renewalPhase: row["renewalPhase"],
              createdBy: "test",
              updatedBy: "test",
            });
          })();
        });
      }
    }
  );

  const splitData = await db.select().from(RefSplitVariantMaster);
  console.log(splitData);
}

async function loadRefSplitsCalcualtionOverride(
  filePath: string,
  sheetName: any
) {
  const splitsTypeSchema = {
    SPLIT_TYPE_CODE: {
      prop: "splitCode",
    },
    COUNTRY_CODE: {
      prop: "countryCode",
    },
    REGION_OR_STATE_CODE: {
      prop: "regionOrStateCode",
    },
    CALCUATION_METHOD: {
      prop: "calculationMethod",
    },
    VALUE: {
      prop: "calcuationValue",
    },
    FORMULA: {
      prop: "formula",
    },
    ROUNDING_CALCULATION: {
      prop: "roundingCalculation",
    },
  };

  readXlsxFile(filePath, { schema: splitsTypeSchema, sheet: sheetName }).then(
    ({ rows, errors }) => {
      console.log(rows);
      if (errors.length === 0) {
        rows.forEach((row: any) => {
          (async () => {
            await db.insert(RefSplitsCalcualtionOverride).values({
              splitCode: row["splitCode"],
              countryCode: row["countryCode"],
              regionOrStateCode: row["regionOrStateCode"],
              calculationMethod: row["calculationMethod"],
              calcuationValue: row["calcuationValue"],
              formula: row["formula"],
              roundingCalculation: row["roundingCalculation"],
              createdBy: "test",
              updatedBy: "test",
            });
          })();
        });
      }
    }
  );

  const splitData = await db.select().from(RefSplitsCalcualtionOverride);
  // console.log(splitData);
}

// loadSplitTypedata(splitsReferenceDataFilePath, "REF_SPLIT_TYPE");
//   loadSplitsCategory(splitsReferenceDataFilePath, "REF_SPLIT_CATEGORY");
// loadRefSplitCategoryToSplitTypeMapping(splitsReferenceDataFilePath, "REF_SPLTS_CTG_TO_SPLTS_TYP_MAP");
// loadrefSplitCategoryToBaseRateMapping(
//   splitsReferenceDataFilePath,
//   "REF_SPLT_CTG_TO_BASE_RATE_MAPPI"
// );
// loadRefSplitVariantMaster(
//   splitsReferenceDataFilePath,
//   "REF_SPLIT_VARIANT_MASTER"
// );

loadRefSplitsCalcualtionOverride(
  splitsReferenceDataFilePath,
  "SPLITS_CALCULATION_OVERRIDE"
);
