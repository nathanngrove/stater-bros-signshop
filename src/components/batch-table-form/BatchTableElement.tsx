import React, { PropsWithChildren } from "react";

type BatchTableElementProps = PropsWithChildren & {
  bold?: boolean;
};

function BatchTableElement({ bold, children }: BatchTableElementProps) {
  return (
    <div className={bold === undefined || bold === false ? "" : "font-bold"}>
      {children}
    </div>
  );
}

export default BatchTableElement;
