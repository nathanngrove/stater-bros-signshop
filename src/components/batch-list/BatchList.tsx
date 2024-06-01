import React from "react";
import BatchListing from "./BatchListing";
import { api } from "~/trpc/server";

async function BatchList() {
  const batches = await api.batch.getAllBatches();

  return (
    <div className="flex flex-col gap-4 rounded-md bg-cyan-600 p-4">
      {batches.length === 0 ? (
        <div className="text-white">No batches to display.</div>
      ) : (
        batches.map(({ id, createdAt, name }) => (
          <BatchListing key={id} id={id} createdAt={createdAt} name={name} />
        ))
      )}
    </div>
  );
}

export default BatchList;
