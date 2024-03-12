"use client";
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
  const handleDelete = async () => {
    try {
      await deleteSummary(id);
    } catch (error) {
      toast.error("Error deleting summary: " + error);
    }
  };

  return (
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
        <CardTitle>{title}</CardTitle>
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
  );
};
