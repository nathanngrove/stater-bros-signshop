import React from "react";
import UPCTableData from "../TableData";

type UPCTableListingProps = {
  name: string;
  id: number;
};

function UPCTableListing({ name, id }: UPCTableListingProps) {
  return (
    <tr>
      <UPCTableData>{name}</UPCTableData>
      <UPCTableData>{id}</UPCTableData>
    </tr>
  );
}

export default UPCTableListing;
