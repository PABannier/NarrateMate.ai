"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatTimestamp } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteSummary } from "@/lib/database/mutations";
import { Disabled } from "@/components/disabled";
import { useStore } from "@/app/zustand";

interface VideoCardProps {
  id: string;
  title: string;
  createdAt: string;
  thumbnailUrl: string;
}

export const VideoCard = ({
  id,
  title,
  createdAt,
  thumbnailUrl,
}: VideoCardProps) => {
  const [isLoading, setLoading] = useState(false);
  const { summariesList, removeSummary } = useStore();
  const handleDelete = async () => {
    setLoading(true);
    console.log(summariesList);

    try {
      await deleteSummary(id);

      removeSummary(id);
      console.log(summariesList);
    } catch (error) {
      toast.error("Error deleting summary: " + error);
    }
    setLoading(false);
  };

  return (
    <Disabled disabled={isLoading}>
      <Card className="border-none p-2 shadow-none rounded-none">
        <CardContent className="p-0 flex flex-col">
          <Link href={`/learning/practice/list/${id}`}>
            <Image
              className="hover:cursor-pointer hover:bg-secondary"
              src={thumbnailUrl}
              alt={title}
              width={480}
              height={360}
            />
          </Link>
        </CardContent>
        <CardHeader className="px-0 py-0 mt-3">
          <Link href={`/learning/practice/list/${id}`}>
            <CardTitle>{title}</CardTitle>
          </Link>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {formatTimestamp(createdAt)}
            </p>
            <AlertDialog>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <AlertDialogTrigger asChild>
                      <Button variant="link">
                        <Trash2 size={20} />
                      </Button>
                    </AlertDialogTrigger>
                  </TooltipTrigger>
                  <TooltipContent>Delete</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    this summary from our database.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardHeader>
      </Card>
    </Disabled>
  );
};
