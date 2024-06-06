import React from "react";
import { createBatchAction } from "~/server/actions/create-batch-action";

function CreateBatch() {
  return (
    <form action={createBatchAction} className="flex h-12 gap-2">
      <input
        type="text"
        placeholder="Title"
        name="name"
        className="flex-grow rounded-full bg-slate-100 px-4 text-black"
      />
      <button
        type="submit"
        className={`w-max rounded-full bg-red-600 px-4 font-semibold text-white transition hover:bg-red-700`}
      >
        Create Batch
      </button>
    </form>
  );
}

export default CreateBatch;
