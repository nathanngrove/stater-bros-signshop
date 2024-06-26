import Link from "next/link";
import { AddUpcs } from "~/app/_components/add-upcs";
import { AddUpcsAction } from "~/app/_components/add-upcs-action";
import BatchTableForm from "~/components/batch-table-form/BatchTableForm";
import BatchTable from "~/components/batch-table/BatchTable";
import UPCTable from "~/components/upc-table/UPCTable";

export default function Page({ params }: { params: { batch: string } }) {
  const { batch } = params;

  return (
    <main className="w-full">
      <div>
        <Link href="/">Back</Link>
      </div>
      <div className="flex flex-wrap gap-4">
        <div className="flex h-full flex-grow-[2] flex-col gap-4">
          <BatchTableForm batchId={Number(batch)} />
          <button className="w-max self-end rounded-full bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700">
            Generate PDF
          </button>
          <AddUpcsAction batchId={batch} />
        </div>
        <div className={"flex-grow"}>
          <UPCTable />
        </div>
      </div>
    </main>
  );
}
