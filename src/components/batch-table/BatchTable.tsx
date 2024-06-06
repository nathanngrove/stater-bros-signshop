"use client";

import React, { useEffect } from "react";
import BatchTableListing, { UPC } from "./BatchTableListing";
import TableHeading from "../TableHeading";
import { api } from "~/trpc/react";
import { redirect, usePathname } from "next/navigation";
import Loading from "../Loading";
import TableData from "../TableData";
import { useSelectedUpcs } from "~/context/SelectedUPCsContext";

function BatchTable() {
  const pathname = usePathname();
  const { selectedUpcs, setSelectedUpcs } = useSelectedUpcs();
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

  useEffect(() => {
    if (data === undefined) return;
    const selected: Array<UPC> = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i]?.selected) selected.push(data[i]?.upc as UPC);
    }
    setSelectedUpcs(selected);
  }, [data]);

  if (isLoading) return <Loading />;

  if (error) return <div>{error.message}</div>;
  console.log(selectedUpcs);

  if (data === undefined) redirect("/");

  return (
    <table cellPadding={8} className="flex-grow overflow-x-scroll text-left">
      <thead>
        <tr>
          {columns.map((label, i) => (
            <TableHeading key={i} label={label} />
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <TableData colSpan={columns.length}>
              There are no UPCs in this batch yet!
            </TableData>
          </tr>
        ) : (
          data.map((listedUpc) => (
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
