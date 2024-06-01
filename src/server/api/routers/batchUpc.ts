import { and, asc, eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { batchTable, batchesToUpcsTable, upcTable } from "~/server/db/schema";

export const batchUpcRouter = createTRPCRouter({
  pushAllUpcsToBatch: publicProcedure
    .input(
      z.object({
        batchId: z.number(),
        upcs: z.array(z.number()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const insertValues: Array<{
        batchId: number;
        upcId: number;
        selected: boolean;
      }> = [];

      for (let i = 0; i < input.upcs.length; i++) {
        insertValues.push({
          batchId: input.batchId,
          upcId: input.upcs[i] as number,
          selected: true,
        });
      }

      await ctx.db.insert(batchesToUpcsTable).values(insertValues);
    }),
  getUpcsOnBatch: publicProcedure
    .input(z.object({ batchId: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db
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
            eq(batchesToUpcsTable.batchId, input.batchId),
          ),
        )
        .innerJoin(upcTable, eq(batchesToUpcsTable.upcId, upcTable.id))
        .orderBy(asc(batchesToUpcsTable.id));
    }),
  updateSelection: publicProcedure
    .input(
      z.object({
        id: z.number(),
        selected: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .update(batchesToUpcsTable)
        .set({ selected: input.selected })
        .where(eq(batchesToUpcsTable.id, input.id))
        .returning({ updatedSelectedUpcs: batchesToUpcsTable.selected });
    }),
});
