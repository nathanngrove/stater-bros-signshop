"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { api } from "~/trpc/react";

type DeleteBatchButtonProps = {
  id: number;
};

function DeleteBatchButton({ id }: DeleteBatchButtonProps) {
  const router = useRouter();

  const deleteBatch = api.batch.deleteBatch.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <button
      className={
        "rounded-md bg-red-500 px-4 font-bold text-white hover:bg-red-700"
      }
      onClick={() => deleteBatch.mutate({ id: id })}
    >
      Delete
    </button>
  );
}

export default DeleteBatchButton;
