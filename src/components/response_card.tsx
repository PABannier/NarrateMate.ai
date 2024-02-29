import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
interface ResponseCardProps {
  title: string;
  description: string;
  feedback: string[];
  className: string;
}
export const ResponseCard = ({
  title,
  description,
  feedback,
  className,
}: ResponseCardProps) => {
  return (
    <>
      {feedback.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>
            {feedback &&
              feedback.length > 0 &&
              feedback.map((f, idx) => {
                return (
                  <div
                    key={idx}
                    className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                  >
                    <span
                      className={cn(
                        "flex h-2 w-2 translate-y-1 rounded-full",
                        className
                      )}
                    />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{f}</p>
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
