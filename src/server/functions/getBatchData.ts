import { and, asc, eq } from "drizzle-orm";
import { db } from "../db";
import { batchTable, batchesToUpcsTable, upcTable } from "../db/schema";

const getBatchData = async (batchId: number) => {
  return await db
    .select({
      id: batchesToUpcsTable.id,
      selected: batchesToUpcsTable.selected,
      upcId: upcTable.id,
      batchId: batchTable.id,
      upc: {
        id: upcTable.id,
        name: upcTable.name,
        size: upcTable.size,
        price: upcTable.price,
        buy_x: upcTable.buy_x,
        get_y: upcTable.get_y,
        digital_deal: upcTable.digital_deal,
        sale_price: upcTable.sale_price,
      },
    })
    .from(batchesToUpcsTable)
    .innerJoin(
      batchTable,
      and(
        eq(batchesToUpcsTable.batchId, batchTable.id),
        eq(batchesToUpcsTable.batchId, batchId),
      ),
    )
    .innerJoin(upcTable, eq(batchesToUpcsTable.upcId, upcTable.id))
    .orderBy(asc(batchesToUpcsTable.id));
};

export default getBatchData;
