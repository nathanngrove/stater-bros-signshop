import React from "react";
import Checkbox from "./Checkbox";
import TableData from "../TableData";

export type UPC = {
  id: number;
  name: string;
  size: string;
  price: number;
  buy_x: number;
  get_y: number;
  digital_deal: boolean;
  sale_price: number;
};

type BatchTableListingProps = {
  id: number;
  item: UPC;
  selected: boolean;
};

function BatchTableListing({ id, item, selected }: BatchTableListingProps) {
  const {
    name,
    buy_x,
    digital_deal,
    get_y,
    id: upcId,
    price,
    sale_price,
    size,
  } = item;

  const options2 = { style: "currency", currency: "USD" };
  const numberFormat = new Intl.NumberFormat("en-US", options2);

  const buy_x_sale = buy_x === 0 || buy_x === undefined ? true : false;

  return (
    <tr>
      <TableData>
        <Checkbox id={id} selected={selected} />
      </TableData>
      <TableData>{name}</TableData>
      <TableData>{upcId}</TableData>
      <TableData>{size}</TableData>
      <TableData>{numberFormat.format(price)}</TableData>
      <TableData>{digital_deal ? "Yes" : "None"}</TableData>
      <TableData>{buy_x_sale ? buy_x : "None"}</TableData>
      <TableData>{buy_x_sale ? numberFormat.format(get_y) : "None"}</TableData>
      <TableData>
        {sale_price > 0 ? numberFormat.format(sale_price) : "None"}
      </TableData>
    </tr>
  );
}

export default BatchTableListing;
