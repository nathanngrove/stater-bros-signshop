import { db } from "../db";
import { batchTable } from "../db/schema";
import { redirect } from "next/navigation";

export async function createBatchAction(data: FormData) {
  "use server";

  const batchName = data.has("name") ? data.get("name") : null;

  if (batchName === null || batchName === "")
    throw new Error("You must enter a name to create a new batch.");

  const batch = await db
    .insert(batchTable)
    .values({
      name: batchName as string,
    })
    .returning({ batchId: batchTable.id });

  redirect(`/batch/${batch[0]!.batchId}`);
}
