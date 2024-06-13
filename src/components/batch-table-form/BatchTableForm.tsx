import React from "react";
import BatchTableFormRow from "./BatchTableFormRow";
import Checkbox from "../batch-table/Checkbox";
import getBatchData from "~/server/functions/getBatchData";
import BatchTableElement from "./BatchTableElement";

type BatchTableFormProps = {
  batchId: number;
};

async function BatchTableForm({ batchId }: BatchTableFormProps) {
  const batchData = await getBatchData(batchId);

  return (
    <form action="">
      {batchData.map((data) => {
        const {
          name,
          buy_x,
          digital_deal,
          get_y,
          id: upcId,
          price,
          sale_price,
          size,
        } = data.upc;

        const options = { style: "currency", currency: "USD" };
        const numberFormat = new Intl.NumberFormat("en-US", options);

        const buy_x_sale = buy_x === 0 || buy_x === undefined ? true : false;

        return (
          <BatchTableFormRow key={data.id}>
            <Checkbox id={data.id} selected={data.selected} />
            <BatchTableElement>{name}</BatchTableElement>
            <BatchTableElement>{upcId}</BatchTableElement>
            <BatchTableElement>{size}</BatchTableElement>
            <BatchTableElement>{numberFormat.format(price)}</BatchTableElement>
            <BatchTableElement>
              {digital_deal ? "Yes" : "None"}
            </BatchTableElement>
            <BatchTableElement>{buy_x_sale ? buy_x : "None"}</BatchTableElement>
            <BatchTableElement>
              {buy_x_sale ? numberFormat.format(get_y) : "None"}
            </BatchTableElement>
            <BatchTableElement>
              {sale_price > 0 ? numberFormat.format(sale_price) : "None"}
            </BatchTableElement>
          </BatchTableFormRow>
        );
      })}
    </form>
  );
}

export default BatchTableForm;
