"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

export function CreateBatch() {
  const router = useRouter();
  const [name, setName] = useState("");

  const createBatch = api.batch.createBatch.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createBatch.mutate({ name });
      }}
      className="flex h-12 gap-2"
    >
      <input
        type="text"
        placeholder="Title"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="flex-grow rounded-full bg-slate-100 px-4 text-black"
      />
      <button
        type="submit"
        className={`w-max rounded-full bg-red-600 px-4 font-semibold text-white transition hover:bg-red-700 ${createBatch.isPending ? "animate-pulse bg-red-500" : null}`}
        disabled={createBatch.isPending}
      >
        {createBatch.isPending ? "Creating..." : "Create Batch"}
      </button>
    </form>
  );
}
