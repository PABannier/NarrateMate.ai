import React from "react";
import {
  Dialog,
  DialogClose,
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
import { Shake } from "reshake";
export default function ReviewDialog({ table }: { table: Table<Word> }) {
  const [progress, setProgress] = React.useState(0);
  const [answer, setAnswer] = React.useState("");
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [selectedRows, setSelectedRows] = React.useState<any[]>([]);
  const [reviewService, setReviewService] = React.useState<ReviewService>();
  const [translation, setTranslation] = React.useState("");
  const [wrong, setWrong] = React.useState(false);
  const freq = 2;

  const handleReviewClick = () => {
    setProgress(0);
    setAnswer("");
    setCurrentIndex(0);
    setTranslation("");
    setWrong(false);
    const rows = table.getSelectedRowModel().rows;
    setSelectedRows(
      rows.map((row) => [row.original.word, row.original.translation])
    );
    const rs = new ReviewService(rows.length, freq);
    setReviewService(rs);

    const index = rs.getNextWordToReview();
    if (index !== null) setCurrentIndex(index);
  };
  const handleVerify = () => {
    setAnswer("");
    setTranslation("");
    const isCorrect = answer === selectedRows[currentIndex][1];
    setWrong(!isCorrect);
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
  const handleClose = () => {
    setProgress(0);
    setAnswer("");
    setCurrentIndex(0);
    setTranslation("");
    setWrong(false);
  };

  const handleGetAnswer = () => {
    const ans = selectedRows[currentIndex][1];
    setTranslation(ans);
  };

  const inputColor = wrong ? "border border-red-500" : "";
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
          <div className="flex flex-col gap-9">
            <Progress value={progress} className="w-full" />
            <div>
              <p className="">What is the translation of:</p>
              <p className="text-lg">
                {selectedRows[currentIndex] && selectedRows[currentIndex][0]}
              </p>
            </div>
            {translation !== "" && (
              <div className="bg-gray-300 text-lg rounded-md p-5 border border-1 border-solid border-gray-300">
                {translation}
              </div>
            )}
            <Shake active={wrong} fixed={wrong} q={1} v={0} r={0}>
              <Input
                type="text"
                placeholder="Answer"
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
                onClick={() => setWrong(false)}
                className={inputColor}
              />
            </Shake>
          </div>
          <div className="w-full flex justify-between">
            <DialogClose asChild>
              <Button type="button" onClick={handleClose}>
                Close
              </Button>
            </DialogClose>
            <div className="flex gap-2">
              <Button type="button" onClick={handleGetAnswer}>
                Get Answer
              </Button>
              <Button
                type="button"
                onClick={handleVerify}
                disabled={answer === ""}
              >
                Verify
              </Button>
            </div>
          </div>{" "}
        </DialogContent>
      </Dialog>
    </div>
  );
}
