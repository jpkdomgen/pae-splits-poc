"use server";

import {
  RefSplitCategoryToSplitTypeMapping,
  RefSplitVariantMaster,
  RefSpltCategory,
} from "@/drizzle/schema";
import { db } from "../src/drizzle/db";
import { and, eq, inArray } from "drizzle-orm";

export async function handleSaveTodoForm(formdata) {
  console.log("Controller: handleSaveTodoForm called....");
  console.log(formdata);
  var todoData = {
    title: formdata.get("title"),
  };
  return {
    title: formdata.get("title"),
    description: `From Server: ${formdata.get("title")}`,
    key: Math.floor(Math.random() * 1000),
  };
}

export async function getSplitsCategory(policyData: any) {
  console.log(`Controller: getPolicyData ${JSON.stringify(policyData)}`);
  const splitCategory = await db
    .select({
      categoryCode: RefSpltCategory.categoryCode,
      id: RefSpltCategory.id,
    })
    .from(RefSpltCategory)
    .where(
      and(
        eq(
          RefSpltCategory.productVariantCode,
          policyData.contract.productVariant
        ),
        eq(
          RefSpltCategory.productVariantVersion,
          policyData.contract.productVariantVersion
        )
      )
    );
  console.log(splitCategory[0]);
  return splitCategory[0];
}

export async function getSplitsForSplitsCategory(splitsCategoryCode: string) {
  const splitsForCategory = await db
    .select({
      splitCode: RefSplitCategoryToSplitTypeMapping.splitCode,
      categoryCode: RefSplitCategoryToSplitTypeMapping.categoryCode,
      id: RefSplitCategoryToSplitTypeMapping.id,
      splitOrder: RefSplitCategoryToSplitTypeMapping.splitOrder,
    })
    .from(RefSplitCategoryToSplitTypeMapping)
    .where(
      eq(RefSplitCategoryToSplitTypeMapping.categoryCode, splitsCategoryCode)
    );

  console.log(splitsForCategory);

  return splitsForCategory;
}

/*
Policy Data: { "contract": { "netFee": "120.00", 
"salesAndServiceTaxRate": "0.20", 
"businessType": "N", 
"contractId": "DG0100000042", 
"productVariant": "ACM", 
"productVariantVersion": "2.0", 
"channelCode": "DNGCC", "renewalPhase": -1,
 "levelOfCover": "STD", 
 "paymentMethod": "CC",
  "periodOfCover": 12 }, "item": { "itemCode": "WSHR", 
  "manufacturerBrandCode": "", "operationalStatus": "W", 
  "manufacturerGuaranteePeriod": 12, "purchaseDate": "2023-10-01 10:00:00", 
  "purchasePrice": 500, "itemAge": 3 }, "person": { "policyHolderLocatorId": "155515368", "regionOrStateCode": "FL", "countryCode": "USA" } }
*/

export async function getSplitsVariantData(policyData: any, splitsData: []) {
  let splitsVariantData = [];

  splitsVariantData = await db
        .select()
        .from(RefSplitVariantMaster)
        .where(inArray(RefSplitVariantMaster.id, [926,1363,1847]));

//   splitsData.forEach(async (splitData) => {
//     console.log(splitData);
//     const sVData = await db
//       .select()
//       .from(RefSplitVariantMaster)
//       .where(
//         and(
//           eq(RefSplitVariantMaster.splitCode, splitData.splitCode),
//           eq(RefSplitVariantMaster.splitCategoryCode, splitData.categoryCode),
//           eq(RefSplitVariantMaster.channelCode, policyData.contract.channelCode),
//           eq(RefSplitVariantMaster.manufacturerBrandCode, 'ANY'),
//           eq(RefSplitVariantMaster.itemTypeCode, policyData.item.itemCode),
//           eq(RefSplitVariantMaster.itemOperationalStatus, policyData.item.operationalStatus),
//           eq(RefSplitVariantMaster.manufacturerGuaranteeInMonths, policyData.item.manufacturerGuaranteePeriod),
//           eq(RefSplitVariantMaster.paymentMethod, policyData.contract.paymentMethod),
//           eq(RefSplitVariantMaster.periodOfCover, policyData.contract.periodOfCover),
//           eq(RefSplitVariantMaster.itemAgeLimit, policyData.item.itemAge),
//           eq(RefSplitVariantMaster.itemPriceBand, policyData.item.purchasePrice),
//           eq(RefSplitVariantMaster.renewalPhase, policyData.contract.renewalPhase),
//         )
//       );
//       console.log(`Split Variant Data : ${JSON.stringify(sVData[0])}`);
//       splitsVariantData.push(sVData);
//   });

  console.log(splitsVariantData);
  return splitsVariantData;
}
