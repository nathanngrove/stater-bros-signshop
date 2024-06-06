import BatchList from "~/components/batch-list/BatchList";
import CreateBatch from "./_components/create-batch";

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
