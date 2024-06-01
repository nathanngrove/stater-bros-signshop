import React from "react";

type BatchTableHeadingProps = {
  label: string;
};

function BatchTableHeading({ label }: BatchTableHeadingProps) {
  return (
    <th scope="col" className="border-2">
      {label}
    </th>
  );
}

export default BatchTableHeading;
