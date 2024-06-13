import { revalidatePath, revalidateTag } from "next/cache";
import { db } from "../db";
import { batchesToUpcsTable } from "../db/schema";
import { requestFormReset } from "react-dom";

export async function addUpcsAction(batchId: string, data: FormData) {
  "use server";

  const upcs = data.has("upcsInput") ? (data.get("upcsInput") as string) : null;

  if (upcs === null || upcs === "") throw new Error("No UPC(s) were entered!");

  const upcArray = upcs.split("\r\n");

  const insertValues: Array<{
    batchId: number;
    upcId: number;
    selected: boolean;
  }> = [];

  for (let i = 0; i < upcArray.length; i++) {
    insertValues.push({
      batchId: Number(batchId),
      upcId: Number(upcArray[i]),
      selected: true,
    });
  }

  const addedUpcs = await db
    .insert(batchesToUpcsTable)
    .values(insertValues)
    .returning({ id: batchesToUpcsTable.upcId });

  revalidatePath("/batch");
}
