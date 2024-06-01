"use client";

import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useRef } from "react";

import { api } from "~/trpc/react";

export function AddUpcs() {
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const upcsRef = useRef<HTMLTextAreaElement>(null);

  const key = getQueryKey(api.batchUpc.getUpcsOnBatch);

  const addUpcs = api.batchUpc.pushAllUpcsToBatch.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key[0]] });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const upcsArr: Array<number> = [];

        const upcsArray = upcsRef.current?.value.split("\n");
        for (let i = 0; i < upcsArray!.length; i++) {
          if (upcsArray![i] !== "") upcsArr.push(Number(upcsArray![i]));
        }

        addUpcs.mutate({
          batchId: Number(pathname.split("/")[2]!),
          upcs: upcsArr,
        });
        upcsRef.current!.value = "";
      }}
      className="flex flex-col gap-2"
    >
      <textarea
        className="bg-slate-200 font-mono"
        name="upcInput"
        ref={upcsRef}
      ></textarea>
      <button
        type="submit"
        className="w-max self-end rounded-full bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700"
        disabled={addUpcs.isPending}
      >
        {addUpcs.isPending ? "Adding UPCs..." : "Add UPCs"}
      </button>
    </form>
  );
}
