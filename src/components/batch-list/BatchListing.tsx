import Link from "next/link";
import React from "react";
import DeleteBatchButton from "./DeleteBatchButton";

type BatchListingProps = {
  id: number;
  name: string;
  createdAt: Date;
};

function BatchListing({ id, name, createdAt }: BatchListingProps) {
  return (
    <div className="flex rounded-md bg-white p-4 hover:bg-slate-100 ">
      <Link href={`/batch/${id}`} className="flex w-full flex-col">
        <div className="font-semibold">{name}</div>
        <div className="flex gap-4">
          <div>{createdAt.toString()}</div>
        </div>
      </Link>
      <DeleteBatchButton id={id} />
    </div>
  );
}

export default BatchListing;
