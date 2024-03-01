import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "./ui/button";
import { FormattedTimeStamp } from "@/types";
import { TranslationHoverCard } from "./hover_card";
import { useState } from "react";

interface TimeStampCardProps {
  timestamps: FormattedTimeStamp[];
  height: number;
  onTimeStampClick: (
    timestamp: number
  ) => React.MouseEventHandler<HTMLButtonElement>;
}

function TokenSpan({ text }: { text: string }) {
  const tokens = text.split(" ");
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseOver = () => {
    setIsHovered(true);
  };
  return (
    <>
      {tokens.map((token, index) => {
        return (
          <div key={index}>
            {!isHovered ? (
              <span key={index}>
                <Button
                  variant="link"
                  className="p-0 h-auto"
                  onMouseOver={handleMouseOver}
                >
                  {token}
                </Button>{" "}
              </span>
            ) : (
              <TranslationHoverCard key={index} word={token}>
                <span key={index}>
                  <Button variant="link" className="p-0 h-auto">
                    {token}
                  </Button>{" "}
                </span>
              </TranslationHoverCard>
            )}
          </div>
        );
      })}
    </>
  );
}

export function TimeStampCard({
  timestamps,
  height,
  onTimeStampClick,
}: TimeStampCardProps) {
  return (
    <ScrollArea className="rounded-md border" style={{ height }}>
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Captions</h4>
        {timestamps.map((timestamp, index) => {
          return (
            <div key={index} className="text-sm flex gap-2 mb-1">
              <Button
                variant="link"
                className="items-start p-0 h-auto text-muted-foreground text-blue-500 font-robotoMono"
                onClick={onTimeStampClick(Number(timestamp.start))}
              >
                {timestamp.formattedStart}
              </Button>
              <TokenSpan text={timestamp.text} />
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}
