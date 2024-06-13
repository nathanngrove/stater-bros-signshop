import React from "react";

type BatchFormRowProps = {
  children: React.ReactNode;
};

function BatchTableFormRow({ children }: BatchFormRowProps) {
  return <div>{children}</div>;
}

export default BatchTableFormRow;
