"use client";

import { Table } from "@tanstack/react-table";
import * as React from "react";
import { Trash2 } from "lucide-react";
import { deleteWords } from "@/lib/database/mutations";
import toast from "react-hot-toast";
import { Word } from "../data/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReviewDialog from "./review-dialog";
interface DataTableToolbarProps<TData> {
  table: Table<Word>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const handleDeleteWords = async () => {
    const selectedRows = table.getSelectedRowModel().rows;

    if (selectedRows.length === 0) {
      return;
    }

    const idsToDelete = selectedRows.map((row) => row.original.id);
    const response = await deleteWords(idsToDelete);
    const { error } = JSON.parse(response);
    if (error) {
      toast.error((error as Error).message);
      return;
    }
    table.toggleAllRowsSelected(false);
    toast.success("Words deleted");
    return;
  };
  return (
    <div className="flex  items-center gap-2">
      <Input
        placeholder="Filter words..."
        value={(table.getColumn("word")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("word")?.setFilterValue(event.target.value)
        }
        className="h-8 w-[150px] lg:w-[250px] "
      />
      <div className="flex flex-1 justify-between ">
        <Button
          disabled={table.getSelectedRowModel().rows.length === 0}
          variant="destructive"
          className="h-8 space-x-2"
          onClick={handleDeleteWords}
        >
          <span>Delete</span> <Trash2 size={20} />
        </Button>

        <ReviewDialog table={table} />
      </div>
    </div>
  );
}
