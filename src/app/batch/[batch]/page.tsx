import Link from "next/link";
import { AddUpcs } from "~/app/_components/add-upcs";
import BatchTable from "~/components/batch-table/BatchTable";
import UPCTable from "~/components/upc-table/UPCTable";

export default function Page() {
  return (
    <main className="w-full">
      <div>
        <Link href="/">Back</Link>
      </div>
      <div className="flex flex-wrap gap-4">
        <div className="flex h-full flex-grow-[2] flex-col gap-4">
          <BatchTable />
          <AddUpcs />
        </div>
        <div className={"flex-grow"}>
          <UPCTable />
        </div>
      </div>
    </main>
  );
}
