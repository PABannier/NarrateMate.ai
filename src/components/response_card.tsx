import React, { Ref } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { parseFormattedTimeStampToSeconds } from "@/lib/subtitles";
import { Idea } from "@/types";

interface ResponseCardProps {
  title: string;
  description: string;
  ideas: Idea[];
  className: string;
  onTimeStampClick: (
    timestamp: number
  ) => React.MouseEventHandler<HTMLButtonElement>;
  scrollFunction: () => void;
}

export const ResponseCard = ({
  title,
  description,
  ideas,
  className,
  onTimeStampClick,
  scrollFunction,
}: ResponseCardProps) => {
  const handleTimeStampClick = (timestamp: string) => {
    scrollFunction();
    return onTimeStampClick(parseFormattedTimeStampToSeconds(timestamp));
  };
  return (
    <>
      {ideas.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>
            {ideas &&
              ideas.length > 0 &&
              ideas.map((f, idx) => {
                return (
                  <div
                    key={idx}
                    className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                  >
                    <span
                      className={cn(
                        "flex h-2 w-2 translate-y-1 rounded-full",
                        className
                      )}
                    />
                    <div>
                      <p className="text-sm font-normal">{f.idea}</p>
                      {/* <p className="text-sm text-muted-foreground">
                        {f.timestamp && `${f.timestamp}`}
                      </p> */}

                      {f.timestamp && (
                        <Button
                          variant="link"
                          className="p-0 h-auto text-muted-foreground font-normal font-robotoMono text-blue-500"
                          onClick={handleTimeStampClick(f.timestamp)}
                        >
                          {f.timestamp}
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
          </CardContent>
        </Card>
      ) : (
        <></>
      )}
    </>
  );
};
