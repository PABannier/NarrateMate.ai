import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ReviewService } from "@/lib/review-service";
import { Table } from "@tanstack/react-table";
import { Word } from "../data/schema";
export default function ReviewDialog({ table }: { table: Table<Word> }) {
  const [progress, setProgress] = React.useState(0);
  const [answer, setAnswer] = React.useState("");
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [selectedRows, setSelectedRows] = React.useState<any[]>([]);
  const [reviewService, setReviewService] = React.useState<ReviewService>();
  const freq = 2;
  const handleReviewClick = () => {
    setProgress(0);
    const rows = table.getSelectedRowModel().rows;
    setSelectedRows(
      rows.map((row) => [row.original.word, row.original.translation])
    );
    const rs = new ReviewService(selectedRows.length, freq);
    setReviewService(rs);

    const index = rs.getNextWordToReview();
    if (index !== null) setCurrentIndex(index);
  };
  const handleVerify = () => {
    setAnswer("");
    const isCorrect = answer === selectedRows[currentIndex][1];
    reviewService!.updateQueue(currentIndex, isCorrect);
    const index = reviewService!.getNextWordToReview();
    if (index !== null) {
      setCurrentIndex(index);
      setProgress(
        (reviewService!.numberOfWordsReviewed() /
          (selectedRows.length * freq)) *
          100
      );
    } else {
      setProgress(100);
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            disabled={table.getSelectedRowModel().rows.length === 0}
            variant="outline"
            className="h-8 space-x-2"
            onClick={handleReviewClick}
          >
            Review
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Review </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-10">
            <Progress value={progress} className="w-full" />
            <div>
              <p>What is the translation of:</p>
              <p>
                {selectedRows[currentIndex] && selectedRows[currentIndex][0]}
              </p>
            </div>
            <Input
              type="text"
              placeholder="Answer"
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
            />
          </div>
          <div className="w-full flex justify-between">
            <Button type="button">Close</Button>
            <div className="flex gap-2">
              <Button type="button">Get Answer</Button>
              <Button type="button" onClick={handleVerify}>
                Verify
              </Button>
            </div>
          </div>{" "}
        </DialogContent>
      </Dialog>
    </div>
  );
}
