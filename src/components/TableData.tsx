import React from "react";

type TableDataProps = {
  colSpan?: number;
  children: React.ReactNode;
};

function TableData({ colSpan, children }: TableDataProps) {
  return (
    <td
      className="border-2 text-center"
      colSpan={colSpan === undefined ? 1 : colSpan}
    >
      {children}
    </td>
  );
}

export default TableData;
