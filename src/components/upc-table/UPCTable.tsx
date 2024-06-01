"use client";

import React from "react";
import TableHeading from "../TableHeading";
import { api } from "~/trpc/react";
import TableData from "../TableData";
import UPCTableListing from "./UPCTableListing";

function UPCTable() {
  const { data, isLoading, error } = api.upc.getAllUpcs.useQuery();

  return (
    <table cellPadding={8} className="h-min w-full">
      <caption className="font-bold">Available UPCs</caption>
      <thead>
        <tr>
          <TableHeading label={"Name"} />
          <TableHeading label={"UPC"} />
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <tr>
            <TableData colSpan={2}>Loading...</TableData>
          </tr>
        ) : error ? (
          <tr>
            <TableData colSpan={2}>{error.message}</TableData>
          </tr>
        ) : (
          data?.map((upc) => (
            <UPCTableListing key={upc.id} name={upc.name} id={upc.id} />
          ))
        )}
      </tbody>
    </table>
  );
}

export default UPCTable;
