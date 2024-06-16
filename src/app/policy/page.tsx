"use client";

import { useCallback, useState } from "react";
import {
  getPolicyData,
  getSplitsCategory,
  getSplitsForSplitsCategory,
  getSplitsVariantData,
} from "../../../lib/actions";

export default function PolicyHomePage() {
  console.log("Rendered....");

  const [policyData, setPolicyData] = useState({});
  const [splitCategory, setSplitCategory] = useState();
  const [splitsForCategory, setSplitsForCategory] = useState([]);
  const [splitVariant, setSplitVariant] = useState([]);

  function handleSubmit(event) {
    console.log(event.get("policyNumber"));
    (async () => {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      let raw = JSON.stringify({
        hostName: "kjeyaprakasam-hexaware-test.co.sandbox.socotra.com",
        username: "alice.lee",
        password: "socotra",
      });

      let requestOptions: any = {
        method: "POST",
        headers: myHeaders,
        body: raw,
      };
      let response = await fetch(
        "https://api.sandbox.socotra.com/account/authenticate",
        requestOptions
      );
      let responseText = await response.text();
      const { authorizationToken } = JSON.parse(responseText);

      myHeaders = new Headers();
      myHeaders.append("Authorization", authorizationToken);

      requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      response = await fetch(
        `https://api.sandbox.socotra.com/policy/${event.get("policyNumber")}`,
        requestOptions
      );
      responseText = await response.text();
      const policyResponse = JSON.parse(responseText);
      console.log(policyResponse);
      const policyObject = {
        contract: {
          netFee:
            policyResponse.exposures[0].perils[0].characteristics[0].fieldValues
              .premium[0],
          salesAndServiceTaxRate:
            policyResponse.exposures[0].perils[0].characteristics[0].fieldValues
              .tax_rate[0],
          businessType: "N",
          contractId:
            policyResponse.characteristics[0].fieldValues.contract_id[0],
          productVariant: "ACM",
          productVariantVersion: "2.0",
          channelCode: "DNGCCC",
          renewalPhase: -1,
          levelOfCover: "STD",
          paymentMethod: "ANY",
          periodOfCover: 12,
        },
        item: {
          itemCode: "WSHR",
          manufacturerBrandCode: "",
          operationalStatus: "W",
          manufacturerGuaranteePeriod: 12,
          purchaseDate: "2023-10-01 10:00:00",
          purchasePrice: 500,
          itemAge: 3,
        },
        person: {
          policyHolderLocatorId: "155515368",
          regionOrStateCode: "FL",
          countryCode: "USA",
        },
      };
      console.log(`Policy Data ${JSON.stringify(policyData)}`);
      setPolicyData(policyObject);
    })();
  }

  function handleGetSplitsCategory() {
    console.log("Get Splits Category data");
    (async () => {
      const splitCategory1 = await getSplitsCategory(policyData);
      setSplitCategory(splitCategory1);
      console.log(`Split Category Found ${splitCategory}`);
    })();
  }

  function handleGetSplitsForSplitsCategory() {
    console.log("Get Splits Data for splits category");
    (async () => {
      const splitsForCategory1 = await getSplitsForSplitsCategory(
        splitCategory.categoryCode
      );
      splitsForCategory1.sort(
        ({ splitOrder: rowid1 }, { splitOrder: rowsid2 }) => rowid1 - rowsid2
      );

      setSplitsForCategory(splitsForCategory1);
      console.log(`Splits for Category Found ${splitsForCategory}`);
    })();
  }

  function handleGetSplitsVariant() {
    console.log("Get Splits Variant");
    (async () => {
      const splitsVariantData = await getSplitsVariantData(
        policyData,
        splitsForCategory
      );

      setSplitVariant(splitsVariantData);
      console.log(`Splits Variant Data ${splitsVariantData}`);
    })();
  }

  return (
    <>
      <h1>Policy Home Page - Splits</h1>
      <div className="container-fluid">
        <div className="row">
          <form action={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Policy Number</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                name="policyNumber"
                value="107229302"
              ></input>
            </div>
            <button type="submit" className="btn btn-primary">
              Get Source Data
            </button>
          </form>
        </div>
        <div className="row">
          <p>Policy Data: {JSON.stringify(policyData, null, 2)}</p>
        </div>

        <div className="row">
          <form action={handleGetSplitsCategory}>
            <button type="submit" className="btn btn-primary">
              Find Splits Category
            </button>
          </form>
          <p>Splits Category: {JSON.stringify(splitCategory, null, 2)}</p>
        </div>

        <div className="row">
          <form action={handleGetSplitsForSplitsCategory}>
            <button type="submit" className="btn btn-primary">
              Find Splits for Category {splitCategory?.categoryCode}
            </button>
          </form>
          {/* <p>Splits : {JSON.stringify(splitsForCategory, null, 2)}</p> */}
          <table>
            <thead>
              <tr>
                <th scope="col">Code</th>
                <th scope="col">Order of Calculation</th>
                {/* <th scope="col">Id</th> */}
              </tr>
            </thead>
            <tbody>
              {splitsForCategory?.map((split) => {
                return (
                  <tr>
                    <td>{split.splitCode}</td>
                    <td>{split.splitOrder}</td>
                    {/* <td>{split.id}</td> */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="row">
          <form action={handleGetSplitsVariant}>
            <button type="submit" className="btn btn-primary">
              Find Split Variant for Poilcy and Item
            </button>
          </form>
          {/* <p>Splits Variant: {JSON.stringify(splitVariant, null, 2)}</p> */}
          <table>
            <thead>
              <tr>
                <th scope="col">splitCode</th>
                <th scope="col">splitCategoryCode</th>
                <th scope="col">channelCode</th>
                <th scope="col">calculationMethod</th>
                <th scope="col">calcuationValue</th>
              </tr>
            </thead>
            <tbody>
              {splitVariant?.map((split) => {
                return (
                  <tr>
                    <td>{split.splitCode}</td>
                    <td>{split.splitCategoryCode}</td>
                    <td>{split.channelCode}</td>
                    <td>{split.calculationMethod}</td>
                    <td>{split.calcuationValue}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

        </div>
      </div>
    </>
  );
}
