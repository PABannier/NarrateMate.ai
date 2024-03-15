import { Metadata } from "next";

import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import PageHeader from "@/components/page-header";
import { getAllWords } from "@/lib/database/queries";

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
};

export default async function WordsPage() {
  const words = await getAllWords();

  return (
    <>
      <div className="h-full px-4 py-6 lg:px-8 space-y-7">
        <PageHeader title="Words" description="Review your words" />
        <DataTable data={words} columns={columns} />
      </div>
    </>
  );
}
