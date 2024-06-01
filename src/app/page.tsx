import { CreateBatch } from "~/app/_components/create-batch";
import BatchList from "~/components/batch-list/BatchList";

export default function Home() {
  return (
    <main className="flex flex-col gap-4">
      <CreateBatch />
      <div>
        <BatchList />
      </div>
    </main>
  );
}
