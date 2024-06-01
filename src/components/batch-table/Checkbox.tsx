"use client";

import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import React from "react";
import { api } from "~/trpc/react";

type CheckboxProps = {
  id: number;
  selected: boolean;
};

function Checkbox({ id, selected }: CheckboxProps) {
  const queryClient = useQueryClient();

  const key = getQueryKey(api.batchUpc.getUpcsOnBatch);

  const updateSelectedUpcs = api.batchUpc.updateSelection.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key[0]] });
    },
  });

  function onSelect() {
    updateSelectedUpcs.mutate({
      id: id,
      selected: !selected,
    });
  }

  return <input type="checkbox" checked={selected} onChange={onSelect} />;
}

export default Checkbox;
