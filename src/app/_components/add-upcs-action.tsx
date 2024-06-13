import { addUpcsAction as action } from "~/server/actions/add-upcs-action";

export function AddUpcsAction({ batchId }: { batchId: string }) {
  const actionWithBatchId = action.bind(null, batchId);

  return (
    <form action={actionWithBatchId} className="flex flex-col gap-2">
      <textarea className="bg-slate-200 font-mono" name="upcsInput"></textarea>
      <button
        type="submit"
        className="w-max self-end rounded-full bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700"
      >
        Add UPCs
      </button>
    </form>
  );
}
