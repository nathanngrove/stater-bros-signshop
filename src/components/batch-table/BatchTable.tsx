"use client";

import React from "react";
import BatchTableListing from "./BatchTableListing";
import TableHeading from "../TableHeading";
import { api } from "~/trpc/react";
import { usePathname } from "next/navigation";
import Loading from "../Loading";
import TableData from "../TableData";

function BatchTable() {
  const pathname = usePathname();
  const { data, isLoading, error } = api.batchUpc.getUpcsOnBatch.useQuery({
    batchId: Number(pathname.split("/")[2]),
  });

  const columns = [
    "",
    "Name",
    "UPC",
    "Size",
    "Price",
    "Digital Deal",
    "Buy X",
    "Get Y",
    "Sale Price",
  ];

  if (isLoading) return <Loading />;

  if (error) return <div>{error.message}</div>;

  return (
    <table
      cellPadding={8}
      className="mb-4 flex-grow overflow-x-scroll text-left"
    >
      <thead>
        <tr>
          {columns.map((label, i) => (
            <TableHeading key={i} label={label} />
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.length === 0 ? (
          <tr>
            <TableData colSpan={columns.length}>
              There are no UPCs in this batch yet!
            </TableData>
          </tr>
        ) : (
          data?.map((listedUpc) => (
            <BatchTableListing
              key={listedUpc.id}
              id={listedUpc.id}
              item={listedUpc.upc}
              selected={listedUpc.selected}
            />
          ))
        )}
      </tbody>
    </table>
  );
}

export default BatchTable;
