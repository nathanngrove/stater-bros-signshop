import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { upcTable } from "~/server/db/schema";

export const upcRouter = createTRPCRouter({
  getAllUpcs: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(upcTable);
  }),
});
