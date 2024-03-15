import { promises as fs } from "fs";
import path from "path";
import { Metadata } from "next";
import Image from "next/image";
import { z } from "zod";

import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { taskSchema, wordSchema } from "./data/schema";
import PageHeader from "@/components/page-header";

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
};

// Simulate a database read for tasks.
async function getWords() {
  const data = await fs.readFile(
    path.join(process.cwd(), "./src/app/learning/review/words/data/words.json")
  );

  const words = JSON.parse(data.toString());

  return z.array(wordSchema).parse(words);
}

export default async function WordsPage() {
  const words = await getWords();

  return (
    <>
      <div className="h-full px-4 py-6 lg:px-8 space-y-7">
        <PageHeader title="Words" description="Review your words" />
        <DataTable data={words} columns={columns} />
      </div>
    </>
  );
}
