import { desc, eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { batchTable, batchesToUpcsTable } from "~/server/db/schema";

export const batchRouter = createTRPCRouter({
  createBatch: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .insert(batchTable)
        .values({
          name: input.name,
        })
        .returning({ batchId: batchTable.id });
    }),
  getAllBatches: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db
      .select()
      .from(batchTable)
      .orderBy(desc(batchTable.createdAt));
  }),
  deleteBatch: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(batchesToUpcsTable)
        .where(eq(batchesToUpcsTable.batchId, input.id));
      return await ctx.db
        .delete(batchTable)
        .where(eq(batchTable.id, input.id))
        .returning({ deletedId: batchTable.id });
    }),
});
